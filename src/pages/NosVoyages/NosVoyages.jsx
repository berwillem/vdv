// src/pages/NosVoyages/NosVoyages.jsx
import React, { useState, useEffect } from "react";
import "./NosVoyages.css";

// React Icons
import {
  FiFilter,
  FiCalendar,
  FiUsers,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiHome,
} from "react-icons/fi";
import { MdClose } from "react-icons/md";

// === Move RangeFilter OUTSIDE the main component ===
const RangeFilter = ({
  label,
  icon,
  value,
  setValue,
  min,
  max,
  step = 1,
  formatValue,
}) => {
  return (
    <div className="filter-group">
      <label className="filter-label">
        {icon} {label}
      </label>
      <input
        type="range"
        className="filter-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div className="range-display">
        {formatValue ? formatValue(value) : value}
      </div>
    </div>
  );
};

// === Main Component ===
const NosVoyages = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [budget, setBudget] = useState(800000);
  const [duration, setDuration] = useState(7);

  // Prevent background scroll
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  // Format number with spaces (1 250 000)
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Sample trips (20 items)
  const baseTrips = [
    {
      title: "Raja Ampat, Indonésie",
      description:
        "Un archipel paradisiaque aux eaux cristallines, idéal pour la plongée et le snorkeling.",
      date: "Nov 2025 - Déc 2025",
      duration: "7 jours",
      persons: "02",
      tags: ["Mer", "Plongée", "Luxe", "Aventure"],
      price: "320.000,00 DZD",
      image:
        "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
    },
    {
      title: "Tizi Ouzou - Culture Kabyle",
      description:
        "Immersion authentique dans les traditions kabyles, randonnées et artisanat local.",
      date: "Déc 2025 - Jan 2026",
      duration: "3 jours",
      persons: "01",
      tags: ["Montagne", "Culture", "Randonnée", "Artisanat"],
      price: "85.000,00 DZD",
      image:
        "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
    },
  ];

  const trips = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    ...baseTrips[i % baseTrips.length],
    title: `${baseTrips[i % baseTrips.length].title} - Séjour ${i + 1}`,
    price: [
      "320.000,00 DZD",
      "85.000,00 DZD",
      "450.000,00 DZD",
      "195.000,00 DZD",
    ][i % 4],
    duration: ["7 jours", "3 jours", "10 jours", "5 jours"][i % 4],
  }));

  return (
    <div className="nosvoyages-container">
      {/* Hero */}
      <div className="hero" aria-label="Destination paradisiaque" />

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Desktop Filters */}
        <aside className="filters-card desktop-filters">
          <h2 className="filters-title">Filtres</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="filter-group">
              <label className="filter-label">
                <FiMapPin className="icon-inline" /> Destination
              </label>
              <input
                type="text"
                placeholder="Où partez-vous ?"
                className="filter-input"
              />
            </div>

            <RangeFilter
              label="Budget par personne"
              icon={<FiDollarSign className="icon-inline" />}
              value={budget}
              setValue={setBudget}
              min={0}
              max={2000000}
              step={10000}
              formatValue={(val) => `${formatNumber(val)} DZD`}
            />

            <RangeFilter
              label="Durée"
              icon={<FiClock className="icon-inline" />}
              value={duration}
              setValue={setDuration}
              min={1}
              max={15}
              formatValue={(val) => `${val} ${val > 1 ? "jours" : "jour"}`}
            />

            <div className="filter-group">
              <label className="filter-label">
                <FiCalendar className="icon-inline" /> Date de départ
              </label>
              <input type="date" className="filter-input" />
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <FiUsers className="icon-inline" /> Nombre de personnes
              </label>
              <input
                type="number"
                min="1"
                defaultValue="2"
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <FiHome className="icon-inline" /> Style d’hébergement
              </label>
              <select className="filter-select">
                <option>Tout</option>
                <option>Hôtel 5*</option>
                <option>Bivouac</option>
                <option>Chez l'habitant</option>
                <option>Resort</option>
              </select>
            </div>

            <button type="submit" className="search-btn">
              Recherche
            </button>
          </form>
        </aside>

        {/* Trips Grid */}
        <section className="trips-grid">
          {trips.map((trip) => (
            <article key={trip.id} className="trip-card">
              <img
                src={trip.image || "/assets/images/placeholder.jpg"}
                alt={trip.title}
                className="trip-image"
                loading="lazy"
              />
              <div className="trip-content">
                <div>
                  <h3 className="trip-title">{trip.title}</h3>
                  <p className="trip-description">{trip.description}</p>
                  <div className="trip-meta">
                    <span className="meta-item">
                      <FiCalendar /> {trip.date}
                    </span>
                    <span className="meta-item">
                      <FiUsers /> {trip.persons}
                    </span>
                    <span className="meta-item">
                      <FiClock /> {trip.duration}
                    </span>
                  </div>
                  <div className="trip-tags">
                    {trip.tags.map((tag, idx) => (
                      <span key={idx} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="trip-bottom">
                  <span className="trip-price">{trip.price}</span>
                  <button className="more-btn">Plus d'information</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>

      {/* Mobile Filter Button */}
      <button
        className="mobile-filter-btn"
        onClick={() => setIsDrawerOpen(true)}
      >
        <FiFilter size={24} />
        <span>Filter</span>
      </button>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className="mobile-drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2 className="filters-title">
                <FiFilter className="icon-inline" /> Filtres
              </h2>
              <button
                className="close-drawer"
                onClick={() => setIsDrawerOpen(false)}
              ></button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsDrawerOpen(false);
              }}
            >
              <div className="filter-group">
                <label className="filter-label">
                  <FiMapPin className="icon-inline" /> Destination
                </label>
                <input
                  type="text"
                  placeholder="Où partez-vous ?"
                  className="filter-input"
                />
              </div>

              <RangeFilter
                label="Budget par personne"
                icon={<FiDollarSign className="icon-inline" />}
                value={budget}
                setValue={setBudget}
                min={0}
                max={2000000}
                step={10000}
                formatValue={(val) => `${formatNumber(val)} DZD`}
              />

              <RangeFilter
                label="Durée"
                icon={<FiClock className="icon-inline" />}
                value={duration}
                setValue={setDuration}
                min={1}
                max={15}
                formatValue={(val) => `${val} ${val > 1 ? "jours" : "jour"}`}
              />

              {/* Other filters... (same as desktop) */}
              <div className="filter-group">
                <label className="filter-label">
                  <FiCalendar className="icon-inline" /> Date de départ
                </label>
                <input type="date" className="filter-input" />
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <FiUsers className="icon-inline" /> Nombre de personnes
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue="2"
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <FiHome className="icon-inline" /> Style d’hébergement
                </label>
                <select className="filter-select">
                  <option>Tout</option>
                  <option>Hôtel 5*</option>
                  <option>Bivouac</option>
                  <option>Chez l'habitant</option>
                  <option>Resort</option>
                </select>
              </div>

              <button type="submit" className="search-btn">
                Appliquer les filtres
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NosVoyages;
