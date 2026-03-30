import React, { useState } from "react";
import Swal from "sweetalert2"; // Import de SweetAlert2
import "./Contact.css";
import { PostContactB2B, PostContactB2C } from "../../services/contact";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("b2c");
  const [loading, setLoading] = useState(false);

  // States pour stocker les données des inputs
  const [b2cForm, setB2cForm] = useState({ name: "", email: "", phone: "", description: "" });
  const [b2bForm, setB2bForm] = useState({ company: "", name: "", email: "", phone: "", site: "", description: "" });

  // Gestion des changements
  const handleB2CChange = (e) => setB2cForm({ ...b2cForm, [e.target.name]: e.target.value });
  const handleB2BChange = (e) => setB2bForm({ ...b2bForm, [e.target.name]: e.target.value });

  // Envoi B2C
  const onB2CSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await PostContactB2C(b2cForm);
      
      // SweetAlert Succès B2C
      Swal.fire({
        icon: 'success',
        title: 'Message envoyé !',
        text: 'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.',
        confirmButtonColor: '#1a1c3d',
      });

      setB2cForm({ name: "", email: "", phone: "", description: "" });
    } catch (err) {
      // SweetAlert Erreur B2C
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Envoi B2B
  const onB2BSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await PostContactB2B(b2bForm);

      // SweetAlert Succès B2B
      Swal.fire({
        icon: 'success',
        title: 'Demande enregistrée !',
        text: 'Notre département B2B analysera votre projet et reviendra vers vous rapidement.',
        confirmButtonColor: '#1a1c3d',
      });

      setB2bForm({ company: "", name: "", email: "", phone: "", site: "", description: "" });
    } catch (err) {
      // SweetAlert Erreur B2B
      Swal.fire({
        icon: 'error',
        title: 'Erreur technique',
        text: "Impossible d'envoyer votre demande pour le moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
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

      <div className="contact-content">
        <div className="form-wrapper">
          {activeTab === "b2c" ? (
            <div className="contact-form-wrapper">
              <h2 className="form-title">Formulaire pour les particuliers</h2>
              <p className="form-subtitle">Besoin d'informations ou d'un devis personnalisé ?</p>
              <form onSubmit={onB2CSubmit}>
                <div className="form-group">
                  <label>Nom complet</label>
                  <input type="text" name="name" value={b2cForm.name} onChange={handleB2CChange} placeholder="Votre nom et prénom" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={b2cForm.email} onChange={handleB2CChange} placeholder="votre@email.com" required />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input type="tel" name="phone" value={b2cForm.phone} onChange={handleB2CChange} placeholder="+213 ..." />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="description" value={b2cForm.description} onChange={handleB2CChange} rows="7" placeholder="Décrivez votre demande..." required></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            </div>
          ) : (
            <div className="contact-form-wrapper">
              <h2 className="form-title">Formulaire pour les entreprises</h2>
              <p className="form-subtitle">Partenariats, voyages d'affaires ou groupes.</p>
              <form onSubmit={onB2BSubmit}>
                <div className="form-group">
                  <label>Nom de l'entreprise</label>
                  <input type="text" name="company" value={b2bForm.company} onChange={handleB2BChange} placeholder="Nom de votre société" required />
                </div>
                <div className="form-group">
                  <label>Nom du contact</label>
                  <input type="text" name="name" value={b2bForm.name} onChange={handleB2BChange} placeholder="Votre nom" required />
                </div>
                <div className="form-group">
                  <label>Email professionnel</label>
                  <input type="email" name="email" value={b2bForm.email} onChange={handleB2BChange} placeholder="contact@votresociete.com" required />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input type="tel" name="phone" value={b2bForm.phone} onChange={handleB2BChange} placeholder="+213 ..." required />
                </div>
                <div className="form-group">
                  <label>Site web (facultatif)</label>
                  <input type="url" name="site" value={b2bForm.site} onChange={handleB2BChange} placeholder="https://www.votresociete.com" />
                </div>
                <div className="form-group">
                  <label>Votre demande</label>
                  <textarea name="description" value={b2bForm.description} onChange={handleB2BChange} rows="7" placeholder="Décrivez votre projet..." required></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Envoi en cours..." : "Envoyer la demande"}
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
              <p>Chéraga, Alger 16000<br />Algérie</p>
            </div>
            <div className="info-card">
              <h3>Téléphone</h3>
              <p>021 37 17 05<br />021 37 32 78</p>
            </div>
            <div className="info-card">
              <h3>Email</h3>
              <p>contact@villagedevoyage.dz</p>
            </div>
            <div className="info-card">
              <h3>Horaires</h3>
              <p>Lundi - Vendredi : 09h00 - 18h00<br />Samedi : 09h00 - 13h00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;