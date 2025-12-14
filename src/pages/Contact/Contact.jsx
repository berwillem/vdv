// src/pages/Contact/Contact.jsx
import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("b2c");

  return (
    <div className="contact-container">
      {/* Hero with overlay text */}
      <div className="contact-hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Contactez-nous</h1>
          <p className="hero-subtitle">
            Nous sommes là pour vous aider à organiser votre prochain voyage
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="contact-tabs">
        <button
          className={`tab-btn ${activeTab === "b2c" ? "active" : ""}`}
          onClick={() => setActiveTab("b2c")}
        >
          Particuliers (B2C)
        </button>
        <button
          className={`tab-btn ${activeTab === "b2b" ? "active" : ""}`}
          onClick={() => setActiveTab("b2b")}
        >
          Entreprises (B2B)
        </button>
        <div className={`tab-indicator ${activeTab}`}></div>
      </div>

      {/* Main Content */}
      <div className="contact-content">
        {/* Form */}
        <div className="form-wrapper">
          {activeTab === "b2c" ? (
            <div className="contact-form-wrapper">
              <h2 className="form-title">Formulaire pour les particuliers</h2>
              <p className="form-subtitle">
                Besoin d'informations ou d'un devis personnalisé ? Remplissez le
                formulaire ci-dessous.
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Nom complet</label>
                  <input
                    type="text"
                    placeholder="Votre nom et prénom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="votre@email.com" required />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input type="tel" placeholder="+213 ..." />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows="7"
                    placeholder="Décrivez votre demande..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Envoyer le message
                </button>
              </form>
            </div>
          ) : (
            <div className="contact-form-wrapper">
              <h2 className="form-title">Formulaire pour les entreprises</h2>
              <p className="form-subtitle">
                Partenariats, voyages d'affaires ou groupes – nous sommes à
                votre écoute.
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Nom de l'entreprise</label>
                  <input
                    type="text"
                    placeholder="Nom de votre société"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nom du contact</label>
                  <input type="text" placeholder="Votre nom" required />
                </div>
                <div className="form-group">
                  <label>Email professionnel</label>
                  <input
                    type="email"
                    placeholder="contact@votresociete.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input type="tel" placeholder="+213 ..." required />
                </div>
                <div className="form-group">
                  <label>Site web (facultatif)</label>
                  <input
                    type="url"
                    placeholder="https://www.votresociete.com"
                  />
                </div>
                <div className="form-group">
                  <label>Votre demande</label>
                  <textarea
                    rows="7"
                    placeholder="Décrivez votre projet..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Envoyer la demande
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="info-wrapper">
          <h2 className="info-title">Nos coordonnées</h2>
          <div className="info-cards">
            <div className="info-card">
              <h3>Adresse</h3>
              <p>
                Chéraga, Alger 16000
                <br />
                Algérie
              </p>
            </div>
            <div className="info-card">
              <h3>Téléphone</h3>
              <p>
                021 37 17 05
                <br />
                021 37 32 78
              </p>
            </div>
            <div className="info-card">
              <h3>Mobile</h3>
              <p>0556 26 08 87</p>
            </div>
            <div className="info-card">
              <h3>Email</h3>
              <p>contact@villagedevoyage.dz</p>
            </div>
            <div className="info-card">
              <h3>Horaires</h3>
              <p>
                Lundi - Vendredi : 09h00 - 18h00
                <br />
                Samedi : 09h00 - 13h00
                <br />
                Dimanche : Fermé
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
