import React from "react";
import "./Details.css"; // Importation du CSS
import { FiCalendar, FiMoon, FiUsers } from "react-icons/fi";

const Details = () => {
  return (
    <div className="page-wrapper">
      {/* NOUVEAU : Titre et Catégories */}
      <header className="header-top">
        <h1 className="main-title">Raja ampat, indonisie</h1>
        <div className="categories-container">
          <span className="badge">Montagne</span>
          <span className="badge">Adventure</span>
          <span className="badge">Discovery</span>
          <span className="badge">Culture</span>
        </div>
      </header>

      <div className="container">
        {/* Contenu Principal */}
        <div className="content-main">
          <img
            className="main-image"
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4"
            alt="Beni Yenni"
          />

          <div className="thumbnail-grid">
            <img src="https://picsum.photos/id/10/200/200" alt="Plage" />
            <img src="https://picsum.photos/id/11/200/200" alt="Mer" />
            <img src="https://picsum.photos/id/12/200/200" alt="Ile" />
            <img src="https://picsum.photos/id/13/200/200" alt="Parasol" />
          </div>

          <section className="description">
            <h2>Description</h2>
            <p>
              Situé au cœur des montagnes du Djurdjura, dans la région de Tizi
              Ouzou, Beni Yenni est un village pittoresque connu pour ses paysages
              verdoyants...
            </p>
            <div className="main-price">8.500,00 DZD</div>
          </section>

          <hr style={{ margin: "30px 0", border: "0.5px solid #eee" }} />

          <section className="availability">
            <h2>Disponibilité</h2>
            <div className="availability-card">
              <div className="transport-tag">
                Type de transport : <strong>Bus</strong>
              </div>

              <div className="date-row">
                <div className="card-date">
                  <div style={{ display: "flex", gap: "30px" }}>
                    <div className="date-info">
                      <span>Vendredi</span>
                      <strong>28 Nov 2025</strong>
                    </div>
                    <div className="date-info">
                      <span>Samedi</span>
                      <strong>29 Nov 2025</strong>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: "bold", color: "#1a1c3d" }}>
                      8.500,00 DZD
                    </div>
                  </div>
                </div>
                <hr />
                <div className="selction-info">
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Places restantes : 0/15
                  </div>
                  <button>Sélectionner</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Barre Latérale de Réservation */}
        <aside className="sidebar">
          <div className="reservation-box">
            <h3 style={{ marginTop: 0, borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
              Réservation
            </h3>

            <div className="form-group">
              <label>Date de depart</label>
              <div className="input-container">
                <FiCalendar />
                <input type="date" />
              </div>
            </div>

            <div className="form-group">
              <label>Nombre de jour</label>
              <div className="input-container">
                <FiMoon />
                <input type="number" placeholder="1" />
              </div>
            </div>

            <div className="form-group">
              <label>Nombre de personne</label>
              <div className="input-container">
                <FiUsers />
                <input type="number" placeholder="1" />
              </div>
            </div>

            <div style={{ marginTop: "40px" }}>
              <span style={{ fontSize: "12px", color: "#888" }}>From:</span>
              <div className="main-price" style={{ marginTop: "0" }}>
                8.500,00 DZD
              </div>
            </div>

            <button className="btn-check">Vérifier la disponibilité</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Details;