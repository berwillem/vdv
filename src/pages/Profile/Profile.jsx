import React, { useState, useEffect } from "react";
import { User, Package, Send, LogOut, Calendar, MapPin } from "lucide-react";

import "./Profile.css";
import { GetUserPersoTrips, GetUserReservations } from "../../services/voyages";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [reservations, setReservations] = useState([]);
  const [persoTrips, setPersoTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (user && token) {
      Promise.all([
        GetUserReservations(user.id, token),
        GetUserPersoTrips(user.id, token)
      ])
        .then(([resRes, resPerso]) => {
          setReservations(resRes.data.data);
          setPersoTrips(resPerso.data.data);
          console.log(resRes.data.data, resPerso.data.data);
          
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur chargement profil:", err);
          setLoading(false);
        });
    }
  }, [user, token]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!user) return <div className="profile-container">Veuillez vous connecter.</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="user-meta">
          <div className="avatar-circle">{user.username?.charAt(0).toUpperCase()}</div>
          <div>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> Déconnexion
        </button>
      </div>

      <div className="profile-tabs">
        <button className={activeTab === "info" ? "active" : ""} onClick={() => setActiveTab("info")}>
          <User size={18} /> Mon Compte
        </button>
        <button className={activeTab === "reservations" ? "active" : ""} onClick={() => setActiveTab("reservations")}>
          <Package size={18} /> Réservations ({reservations.length})
        </button>
        <button className={activeTab === "perso" ? "active" : ""} onClick={() => setActiveTab("perso")}>
          <Send size={18} /> Demandes Perso ({persoTrips.length})
        </button>
      </div>

      <div className="tab-content">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <>
            {/* ONGLET INFO COMPTE */}
            {activeTab === "info" && (
              <div className="info-card">
                <h3>Informations personnelles</h3>
                <div className="info-grid">
                  <div className="info-item"><span>Nom d'utilisateur</span><strong>{user.username}</strong></div>
                  <div className="info-item"><span>Email</span><strong>{user.email}</strong></div>
                  <div className="info-item"><span>Membre depuis</span><strong>{new Date(user.createdAt).toLocaleDateString()}</strong></div>
                </div>
              </div>
            )}

            {/* ONGLET RÉSERVATIONS */}
            {activeTab === "reservations" && (
              <div className="list-container">
                {reservations.length > 0 ? reservations.map((res) => (
                  <div key={res.id} className="item-card">
                    <div className="item-details">
                      <h4>{res.voyage?.name || "Voyage"}</h4>
                      <p><Calendar size={14} /> Réservé le : {new Date(res.createdAt).toLocaleDateString()}</p>
                      <p>Voyageurs : {res.nb_personnes}</p>
                    </div>
                    <div className="item-status status-en_attente">
                      {res.statut || "En attente"}
                    </div>
                    <div className="item-price">{res.montant_total?.toLocaleString()} DZD</div>
                  </div>
                )) : <p>Aucune réservation pour le moment.</p>}
              </div>
            )}

            {/* ONGLET DEMANDES PERSO */}
            {activeTab === "perso" && (
              <div className="list-container">
                {persoTrips.length > 0 ? persoTrips.map((trip) => (
                  <div key={trip.id} className="item-card">
                    <div className="item-details">
                      <h4><MapPin size={16} /> {trip.Destination}</h4>
                      <p>Date souhaitée : {trip.date ? new Date(trip.date).toLocaleDateString() : "Non précisée"}</p>
                      <p>Budget : {trip.budget?.toLocaleString()} DZD</p>
                    </div>
                    <div className="item-status status-envoye">Envoyé</div>
                  </div>
                )) : <p>Aucune demande personnalisée.</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;