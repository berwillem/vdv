import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import "./Entreprise.css";
import { PostContactEntreprise } from "../../services/entreprise"; // Import du service

const Entreprise = () => {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await PostContactEntreprise(formData);

      // Succès
      Swal.fire({
        icon: "success",
        title: "Demande envoyée !",
        text: "Votre demande de devis entreprise a bien été reçue. Nous reviendrons vers vous très prochainement.",
        confirmButtonColor: "#1a1c3d",
      });

      // Reset du formulaire
      setFormData({
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

    } catch (error) {
      console.error("Erreur envoi entreprise:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de l'envoi. Veuillez vérifier vos informations ou réessayer plus tard.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="entreprise-page">
      <div className="entreprise-hero"></div>
      <div className="entreprise-label">
        <div className="badge">Entreprise</div>
        <h1 className="hero-title">Encadrement complet</h1>
      </div>

      <div className="encadrement-section">
        <div className="encadrement-grid">
          <div className="encadrement-block"></div>
          <div className="encadrement-block"></div>
          <div className="encadrement-block"></div>
        </div>
      </div>

      <div className="formulaire-section">
        <h2 className="formulaire-title">Formulaire de demande</h2>

        <form onSubmit={handleSubmit} className="entreprise-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nom</label>
              <input type="text" name="nom" value={formData.nom} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Entreprise</label>
            <input type="text" name="entreprise" value={formData.entreprise} onChange={handleChange} required disabled={loading} />
          </div>

          <div className="form-group full-width">
            <label>Domaine d'activité</label>
            <input type="text" name="domaine" value={formData.domaine} onChange={handleChange} required disabled={loading} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date de l'événement</label>
              <input type="date" name="dateEvenement" value={formData.dateEvenement} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label>Nombre de jours</label>
              <input type="number" name="nombreJours" value={formData.nombreJours} onChange={handleChange} min="1" required disabled={loading} />
            </div>
          </div>

          <div className="form-group full-width radio-group">
            <label>Souhaitez-vous inclure un transport en bus ?</label>
            <div className="radio-options">
              <label>
                <input type="radio" name="transportBus" value="oui" checked={formData.transportBus === "oui"} onChange={handleChange} disabled={loading} />
                Oui
              </label>
              <label>
                <input type="radio" name="transportBus" value="non" checked={formData.transportBus === "non"} onChange={handleChange} disabled={loading} />
                Non
              </label>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Plus de détails</label>
            <textarea name="details" value={formData.details} onChange={handleChange} rows="6" placeholder="Besoins spécifiques, type d'activités souhaitées..." disabled={loading} />
          </div>

          <button type="submit" className="envoyer-btn" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Entreprise;