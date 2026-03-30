import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { User, Package, Send, LogOut, Calendar, MapPin } from "lucide-react";

import "./Profile.css";
import { GetUserPersoTrips, GetUserReservations } from "../../services/voyages";

const Profile = () => {
  const { t, i18n } = useTranslation();
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
    window.location.href = "/SignIn";
  };

  // Formatage de date selon la langue
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language);
  };

  if (!user) return <div className="profile-container">{t("profile.not_logged_in")}</div>;

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
          <LogOut size={18} /> {t("profile.logout")}
        </button>
      </div>

      <div className="profile-tabs">
        <button className={activeTab === "info" ? "active" : ""} onClick={() => setActiveTab("info")}>
          <User size={18} /> {t("profile.tabs.account")}
        </button>
        <button className={activeTab === "reservations" ? "active" : ""} onClick={() => setActiveTab("reservations")}>
          <Package size={18} /> {t("profile.tabs.reservations")} ({reservations.length})
        </button>
        <button className={activeTab === "perso" ? "active" : ""} onClick={() => setActiveTab("perso")}>
          <Send size={18} /> {t("profile.tabs.custom_trips")} ({persoTrips.length})
        </button>
      </div>

      <div className="tab-content">
        {loading ? (
          <p>{t("profile.loading")}</p>
        ) : (
          <>
            {/* ONGLET INFO COMPTE */}
            {activeTab === "info" && (
              <div className="info-card">
                <h3>{t("profile.info.title")}</h3>
                <div className="info-grid">
                  <div className="info-item"><span>{t("profile.info.username")}</span><strong>{user.username}</strong></div>
                  <div className="info-item"><span>{t("profile.info.email")}</span><strong>{user.email}</strong></div>
                  <div className="info-item"><span>{t("profile.info.member_since")}</span><strong>{formatDate(user.createdAt)}</strong></div>
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
                      <p><Calendar size={14} /> {t("profile.reservations.date")} {formatDate(res.createdAt)}</p>
                      <p>{t("profile.reservations.travelers")} {res.nb_personnes}</p>
                    </div>
                    <div className="item-status status-en_attente">
                      {res.statut || t("profile.reservations.status_pending")}
                    </div>
                    <div className="item-price">{res.montant_total?.toLocaleString()} DZD</div>
                  </div>
                )) : <p>{t("profile.reservations.none")}</p>}
              </div>
            )}

            {/* ONGLET DEMANDES PERSO */}
            {activeTab === "perso" && (
              <div className="list-container">
                {persoTrips.length > 0 ? persoTrips.map((trip) => (
                  <div key={trip.id} className="item-card">
                    <div className="item-details">
                      <h4><MapPin size={16} /> {trip.Destination}</h4>
                      <p>{t("profile.custom.desired_date")} {trip.date ? formatDate(trip.date) : t("profile.custom.unspecified")}</p>
                      <p>{t("profile.custom.budget")} {trip.budget?.toLocaleString()} DZD</p>
                    </div>
                    <div className="item-status status-envoye">{t("profile.custom.status_sent")}</div>
                  </div>
                )) : <p>{t("profile.custom.none")}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;