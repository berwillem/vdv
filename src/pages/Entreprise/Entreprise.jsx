// src/pages/Entreprise/Entreprise.jsx
import { useState } from "react";
import "./Entreprise.css";

const Entreprise = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    entreprise: "",
    domaine: "",
    email: "",
    telephone: "",
    dateEvenement: "",
    nombreJours: "",
    transportBus: "non",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Demande envoyée ! (simulation)\n" + JSON.stringify(formData, null, 2),
    );
    // Ici vous pourrez connecter un vrai backend (EmailJS, API, etc.)
  };

  return (
    <div className="entreprise-page">
      {/* Hero sombre */}

      <div className="entreprise-hero"></div>
      <div className="entreprise-label">
        <div className="badge">Entreprise</div>
        <h1 className="hero-title">Encadrement complet</h1>
      </div>

      {/* Blocs Encadrement */}
      <div className="encadrement-section">
        <div className="encadrement-grid">
          <div className="encadrement-block"></div>
          <div className="encadrement-block"></div>
          <div className="encadrement-block"></div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="formulaire-section">
        <h2 className="formulaire-title">Formulaire</h2>

        <form onSubmit={handleSubmit} className="entreprise-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Entreprise</label>
            <input
              type="text"
              name="entreprise"
              value={formData.entreprise}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Domaine d'activité</label>
            <input
              type="text"
              name="domaine"
              value={formData.domaine}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Date de votre événement</label>
            <input
              type="date"
              name="dateEvenement"
              value={formData.dateEvenement}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Nombre de jours</label>
            <input
              type="number"
              name="nombreJours"
              value={formData.nombreJours}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group full-width radio-group">
            <label>Souhaitez-vous inclure un transport en bus ?</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  name="transportBus"
                  value="oui"
                  checked={formData.transportBus === "oui"}
                  onChange={handleChange}
                />
                Oui
              </label>
              <label>
                <input
                  type="radio"
                  name="transportBus"
                  value="non"
                  checked={formData.transportBus === "non"}
                  onChange={handleChange}
                />
                Non
              </label>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Plus de détails</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="6"
              placeholder="Décrivez votre événement, vos besoins spécifiques..."
            />
          </div>

          <button type="submit" className="envoyer-btn">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Entreprise;
