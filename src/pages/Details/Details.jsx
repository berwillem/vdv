import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Ajout navigate pour redirection si besoin
import Swal from "sweetalert2"; // Import SweetAlert
import "./Details.css";
import { FiCalendar, FiMoon, FiUsers, FiX } from "react-icons/fi";
import { GetVoyageById } from "../../services/voyages";
import { CreateReservation } from "../../services/reservation";
// Import du nouveau service

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voyage, setVoyage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  // --- ÉTATS POUR LA RÉSERVATION (POP-UP) ---
  const [showModal, setShowModal] = useState(false);
  const [selectedDispo, setSelectedDispo] = useState(null);
  const [reservePeople, setReservePeople] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // États filtres
  const [inputDate, setInputDate] = useState("");
  const [inputDays, setInputDays] = useState("");
  const [inputPeople, setInputPeople] = useState("");
  const [activeFilters, setActiveFilters] = useState({ date: "", days: "", people: "" });

  const STRAPI_URL = "http://localhost:1337";

  useEffect(() => {
    GetVoyageById(id)
      .then((res) => {
        setVoyage(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching voyage:", err);
        setLoading(false);
      });
  }, [id]);

  // --- LOGIQUE DE RÉSERVATION ---
  const handleOpenModal = (dispo) => {
    const token = localStorage.getItem("jwt");
    
    // Vérification de connexion immédiate avant d'ouvrir la modale
    if (!token) {
      Swal.fire({
        title: "Connexion requise",
        text: "Veuillez vous connecter pour réserver ce voyage.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Se connecter",
        cancelButtonText: "Plus tard"
      }).then((result) => {
        if (result.isConfirmed) navigate("/signin");
      });
      return;
    }

    setSelectedDispo(dispo);
    setReservePeople(inputPeople || 1);
    setShowModal(true);
  };

  const handleConfirmReservation = async () => {
    setIsSubmitting(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("jwt");

      const totalAmount = (selectedDispo.prix || voyage.price) * reservePeople;

      const payload = {
        data: {
          nb_personnes: parseInt(reservePeople),
          montant_total: totalAmount,
          date_reservation: new Date(),
          statut: "en_attente",
          user: userData.id,
          voyage: voyage.documentId,
          dispo_id: selectedDispo.id
        }
      };

      // Appel du service au lieu d'axios en direct
      await CreateReservation(payload, token);

      setShowModal(false);
      
      // SweetAlert de succès
      Swal.fire({
        title: "Félicitations !",
        text: "Votre réservation a été enregistrée avec succès. Notre équipe vous contactera prochainement.",
        icon: "success",
        confirmButtonColor: "#1a1c3d"
      });

    } catch (error) {
      console.error("Erreur reservation:", error);
      Swal.fire({
        title: "Erreur",
        text: "Une erreur est survenue lors de la réservation. Veuillez réessayer.",
        icon: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (Reste de tes fonctions handleCheckAvailability et filtrage inchangé)
  const handleCheckAvailability = () => {
    setIsChecking(true);
    setTimeout(() => {
      setActiveFilters({ date: inputDate, days: inputDays, people: inputPeople });
      setIsChecking(false);
    }, 600);
  };

  const filteredDispos = voyage?.disponibilite?.filter((dispo) => {
    const matchDate = activeFilters.date ? dispo.date_depart === activeFilters.date : true;
    let matchDays = true;
    if (activeFilters.days) {
      const start = new Date(dispo.date_depart);
      const end = new Date(dispo.date_retour);
      const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
      matchDays = diffDays === parseInt(activeFilters.days);
    }
    const remainingPlaces = dispo.places_max - (dispo.places_occup || 0);
    const matchPeople = activeFilters.people ? remainingPlaces >= parseInt(activeFilters.people) : true;
    return matchDate && matchDays && matchPeople;
  });

  if (loading) return <div className="page-wrapper">Chargement...</div>;
  if (!voyage) return <div className="page-wrapper">Voyage introuvable</div>;

  return (
    <div className="page-wrapper details-page">
      {/* --- POP-UP DE CONFIRMATION (Utilisation des états React existants pour le style personnalisé) --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="close-btn" onClick={() => setShowModal(false)}><FiX /></button>
            <h3>Finaliser la réservation</h3>
            <p>Voyage : <strong>{voyage.name}</strong></p>
            
            <div className="modal-body">
              <div className="info-line">
                <span>Date :</span>
                <span>{new Date(selectedDispo.date_depart).toLocaleDateString()}</span>
              </div>
              
              <div className="info-line">
                <label>Nombre de personnes :</label>
                <input 
                  type="number" 
                  value={reservePeople} 
                  min="1" 
                  max={selectedDispo.places_max - (selectedDispo.places_occup || 0)}
                  onChange={(e) => setReservePeople(e.target.value)} 
                />
              </div>

              <div className="total-line">
                <span>Total :</span>
                <strong>{((selectedDispo.prix || voyage.price) * reservePeople).toLocaleString()} DZD</strong>
              </div>
            </div>

            <button 
              className="confirm-btn" 
              onClick={handleConfirmReservation}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Traitement..." : "Confirmer la Réservation"}
            </button>
          </div>
        </div>
      )}

      {/* Reste du JSX identique à ton code original */}
      <header className="header-top">
        <h1 className="main-title">{voyage.name}</h1>
        <div className="categories-container">
          {voyage.categories?.map((cat) => (
            <span key={cat.id} className="badge">{cat.name}</span>
          ))}
        </div>
      </header>

      <div className="container">
        <div className="content-main">
          <img
            className="main-image"
            src={voyage.image?.[0] ? `${STRAPI_URL}${voyage.image[0].url}` : "https://via.placeholder.com/800"}
            alt={voyage.name}
          />
          {/* ... suite du rendu des images, description et disponibilités ... */}
          <section className="description">
            <h2>Description</h2>
            <p>{voyage.description}</p>
            <div className="main-price">{voyage.price?.toLocaleString()} DZD</div>
          </section>

          <hr style={{ margin: "30px 0", border: "0.5px solid #eee" }} />

          <section className="availability">
            <h2>Disponibilité ({filteredDispos?.length || 0})</h2>
            {filteredDispos && filteredDispos.length > 0 ? (
              filteredDispos.map((dispo, index) => (
                <div className="availability-card" key={index} style={{ marginBottom: "15px" }}>
                  <div className="transport-tag">Type : <strong>{dispo.type_transport || "Bus"}</strong></div>
                  <div className="date-row">
                    <div className="card-date">
                      <div className="date-info">
                        <span>Départ</span>
                        <strong>{new Date(dispo.date_depart).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}</strong>
                      </div>
                      <div className="date-info">
                        <span>Retour</span>
                        <strong>{new Date(dispo.date_retour).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}</strong>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: "bold", color: "#1a1c3d" }}>
                          {dispo.prix?.toLocaleString() || voyage.price?.toLocaleString()} DZD
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="selction-info">
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        Places : {dispo.places_max - (dispo.places_occup || 0)}/{dispo.places_max}
                      </div>
                      <button className="btn-select" onClick={() => handleOpenModal(dispo)}>Sélectionner</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#888", fontStyle: "italic" }}>Aucun créneau disponible.</p>
            )}
          </section>
        </div>

        <aside className="sidebar details-sidebar">
          {/* Sidebar avec filtres ... */}
          <div className="reservation-box">
             <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Réservation</h3>

             <div className="form-group">
               <label>Date de depart</label>
               <div className="input-container">
                 <FiCalendar />
                 <input type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
               </div>
             </div>

             <div className="form-group">
               <label>Nombre de jour</label>
               <div className="input-container">
                 <FiMoon />
                 <input type="number" placeholder="1" value={inputDays} onChange={(e) => setInputDays(e.target.value)} />
               </div>
             </div>

             <div className="form-group">
               <label>Nombre de personne</label>
               <div className="input-container">
                 <FiUsers />
                 <input type="number" placeholder="1" value={inputPeople} onChange={(e) => setInputPeople(e.target.value)} />
               </div>
             </div>

             <button 
               className={`btn-check ${isChecking ? "loading" : ""}`} 
               onClick={handleCheckAvailability}
               disabled={isChecking}
             >
               {isChecking ? "Recherche..." : "Vérifier la disponibilité"}
             </button>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default Details;