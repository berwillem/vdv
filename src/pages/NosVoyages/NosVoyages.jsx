import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import "./NosVoyages.css";

// React Icons
import {
  FiCalendar,
  FiUsers,
  FiMapPin,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_LINK; 
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

const RangeFilter = ({ label, icon, value, setValue, min, max, step = 1, formatValue }) => (
  <div className="filter-group">
    <label className="filter-label">{icon} {label}</label>
    <input
      type="range"
      className="filter-range"
      min={min} max={max} step={step}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
    />
    <div className="range-display">{formatValue ? formatValue(value) : value}</div>
  </div>
);

const NosVoyages = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- States des Filtres ---
  const [searchName, setSearchName] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [startDate, setStartDate] = useState("");
  const [numPersons, setNumPersons] = useState(1);
  
  // --- States Pagination ---
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pageCount: 1 });

const fetchTrips = async () => {
  setLoading(true);
  try {
    // 1. On demande à Strapi les filtres de base (Nom et Prix)
    const query = qs.stringify({
      filters: {
        ...(searchName && { name: { $contains: searchName } }),
        price: { $lte: maxPrice },
      },
      pagination: { page, pageSize: 10 }, // On prend une large page pour filtrer en JS
      populate: ["image", "disponibilite"], 
    }, { encodeValuesOnly: true });

    const response = await axios.get(`${BASE_URL}/voyages?${query}`);
    const allVoyages = response.data.data || [];

    // 2. LOGIQUE DE FILTRAGE MANUELLE (Teste TOUTES les disponibilités)
    const filteredTrips = allVoyages.filter((trip) => {
      // S'il n'y a aucune ligne de disponibilité, on cache le voyage
      if (!trip.disponibilite || trip.disponibilite.length === 0) return false;

      // .some() renvoie "true" si AU MOINS UNE ligne du tableau correspond
      return trip.disponibilite.some((disp) => {
        // Condition A : La date de départ est-elle OK ?
        // Si startDate est vide, c'est OK par défaut.
        const isDateOk = startDate 
          ? new Date(disp.date_depart) >= new Date(startDate) 
          : true;

        // Condition B : Reste-t-il assez de places ? (max - occup)
        const remainingPlaces = (disp.places_max || 0) - (disp.places_occup || 0);
        const isPlacesOk = remainingPlaces >= numPersons;

        // La ligne est valide si la date ET les places sont OK
        return isDateOk && isPlacesOk;
      });
    });

    setTrips(filteredTrips);
    
    // Note: La pagination meta de Strapi sera faussée par le filtre JS. 
    // Si tu as beaucoup de données, il faudra passer par un filtre custom côté backend.
    setPagination(response.data.meta.pagination);

  } catch (error) {
    console.error("Erreur de filtrage:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { fetchTrips(); }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchTrips();
  };

  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className="nosvoyages-container">
      <div className="hero" />

      <div className="content-wrapper">
        <aside className="filters-card desktop-filters">
          <h2 className="filters-title">Filtres</h2>
          <form onSubmit={handleSearch}>
            <div className="filter-group">
              <label className="filter-label"><FiMapPin className="icon-inline" /> Destination</label>
              <input 
                type="text" 
                className="filter-input"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label"><FiCalendar className="icon-inline" /> Date de départ</label>
              <input 
                type="date" 
                className="filter-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label"><FiUsers className="icon-inline" /> Voyageurs</label>
              <input 
                type="number" 
                min="1"
                className="filter-input"
                value={numPersons}
                onChange={(e) => setNumPersons(Number(e.target.value))}
              />
            </div>

            <RangeFilter
              label="Budget Max"
              icon={<FiDollarSign className="icon-inline" />}
              value={maxPrice}
              setValue={setMaxPrice}
              min={0}
              max={1500000}
              step={10000}
              formatValue={(val) => `${formatNumber(val)} DZD`}
            />

            <button type="submit" className="search-btn">Rechercher</button>
          </form>
        </aside>

        <section className="trips-grid-container">
          <div className="trips-grid">
            {loading ? (
              <div className="loading-state">Recherche en cours...</div>
            ) : trips.length > 0 ? (
              trips.map((trip) => {
                // Trouver la disponibilité la plus proche qui correspond aux critères
                const bestOption = trip.disponibilite.find(disp => {
                  const checkDate = startDate ? new Date(disp.date_depart) >= new Date(startDate) : true;
                  const checkPlaces = (disp.places_max - disp.places_occup) >= numPersons;
                  return checkDate && checkPlaces;
                }) || trip.disponibilite[0];

                const remaining = bestOption.places_max - bestOption.places_occup;
                
                return (
                  <Link to={`/details/${trip.documentId}`}  key={trip.id} className="trip-card">
                    <img
                      src={trip.image?.[0]?.url ? `${STRAPI_URL}${trip.image[0].url}` : "/placeholder.jpg"}
                      alt={trip.name}
                      className="trip-image"
                    />
                    <div className="trip-content">
                      <div>
                        <h3 className="trip-title">{trip.name}</h3>
                        <p className="trip-description">{trip.description}</p>
                        <div className="trip-meta">
                          <span className="meta-item">
                            <FiCalendar /> {new Date(bestOption.date_depart).toLocaleDateString()}
                          </span>
                          <span className={`meta-item ${remaining < 3 ? 'low-stock' : ''}`}>
                            <FiUsers /> {remaining} places restantes
                          </span>
                        </div>
                      </div>
                      <div className="trip-bottom">
                        <span className="trip-price">{formatNumber(trip.price)} DZD</span>
                        <button className="more-btn">Détails</button>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="no-results">Aucun voyage ne correspond à toutes vos dates ou nombre de places.</div>
            )}
          </div>

          {!loading && pagination.pageCount > 1 && (
            <div className="pagination-wrapper">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="page-nav-btn"><FiChevronLeft /></button>
              <span className="page-text">{page} / {pagination.pageCount}</span>
              <button disabled={page === pagination.pageCount} onClick={() => setPage(page + 1)} className="page-nav-btn"><FiChevronRight /></button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default NosVoyages;