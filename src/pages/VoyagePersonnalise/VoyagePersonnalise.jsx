import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // 1. Import de SweetAlert2
import "./VoyagePersonnalise.css";
import { Perso } from "../../services/perso";
import { Navigate } from "react-router-dom";

const VoyagePersonnalise = () => {
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Destination: "",
    nbr: 1,
    budget: 50000,
    date: "",
  });

  const totalSteps = 4;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      // Optionnel : Alerte si le champ est vide
      Swal.fire({
        icon: "warning",
        title: "Champ requis",
        text: "Veuillez remplir les informations avant de continuer.",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const validateStep = () => {
    switch (step) {
      case 1: return formData.Destination.trim() !== "";
      case 2: return formData.nbr >= 1;
      case 3: return formData.budget >= 0;
      case 4: return formData.date !== "";
      default: return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      setLoading(true);

      const token = localStorage.getItem("jwt");
      const userStorage = localStorage.getItem("user");

 if (!token) {
      Swal.fire({
        icon: "info",
        title: "Connexion requise",
        text: "Vous devez être connecté pour envoyer une demande personnalisée.",
        showCancelButton: true,
        confirmButtonText: "Se connecter",
        cancelButtonText: "Plus tard",
        confirmButtonColor: "#1a1c3d",
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate("/SignIn");
        }
      });
      return;
    }

      const user = JSON.parse(userStorage);
      const userIdentifier = user.id;

      try {
        await Perso(formData, userIdentifier, token);

        // 3. SweetAlert de succès
        Swal.fire({
          icon: "success",
          title: "Demande envoyée !",
          text: "Votre projet de voyage a bien été enregistré.",
          timer: 3000,
          showConfirmButton: false,
        });

        setShowConfetti(true);
        setIsSubmitted(true);
        setTimeout(() => setShowConfetti(false), 8000);
      } catch (error) {
        console.error("Erreur Strapi:", error.response?.data || error.message);
        const errorMsg = error.response?.data?.error?.message;
        
        // 4. SweetAlert pour les erreurs serveurs
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: errorMsg === "Forbidden" ? "Session expirée, reconnectez-vous." : "Une erreur est survenue lors de l'envoi.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setFormData({ Destination: "", nbr: 1, budget: 50000, date: "" });
  };

  // Effet Confetti (inchangé)
  useEffect(() => {
    if (showConfetti) {
      const travelEmojis = ["✈️", "🧳", "🌴", "🌍", "🏖️", "🏔️", "🌅"];
      const interval = setInterval(() => {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.textContent = travelEmojis[Math.floor(Math.random() * travelEmojis.length)];
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 4 + 3 + "s";
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 8000);
      }, 120);
      return () => clearInterval(interval);
    }
  }, [showConfetti]);

  return (
    <div className="vp-container">
      <div className="vp-content">
        {!isSubmitted ? (
          <>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
              </div>
              <p className="progress-text">Étape {step} sur {totalSteps}</p>
            </div>

            <div className="step-card">
              <form className="vp-form" onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">Où rêvez-vous d'aller ?</h2>
                    <input type="text" name="Destination" value={formData.Destination} onChange={handleChange} placeholder="Paris, Bali, New York..." required />
                  </div>
                )}
                {step === 2 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">Combien de voyageurs ?</h2>
                    <input type="number" name="nbr" value={formData.nbr} onChange={handleChange} min="1" required />
                  </div>
                )}
                {step === 3 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">Budget par personne (DZD)</h2>
                    <input type="number" name="budget" value={formData.budget} onChange={handleChange} min="0" step="5000" required />
                  </div>
                )}
                {step === 4 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">Quand souhaitez-vous partir ?</h2>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                  </div>
                )}

                <div className="step-buttons">
                  {step > 1 && (
                    <button type="button" className="prev-btn" onClick={prevStep} disabled={loading}>
                      Précédent
                    </button>
                  )}
                  {step < totalSteps ? (
                    <button type="button" className="next-btn" onClick={nextStep}>
                      Suivant
                    </button>
                  ) : (
                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? "Envoi..." : "Finaliser ma demande 🎉"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="confirmation-card fade-in">
            <h2 className="confirmation-title">Félicitations ! 🎉</h2>
            <p className="confirmation-message">Demande envoyée avec succès !</p>
            <div className="contact-summary">
              <h3>Résumé :</h3>
              <ul>
                <li><strong>Destination :</strong> {formData.Destination}</li>
                <li><strong>Voyageurs :</strong> {formData.nbr}</li>
                <li><strong>Budget :</strong> {formData.budget.toLocaleString()} DZD</li>
                <li><strong>Date :</strong> {formData.date}</li>
              </ul>
            </div>
            <div className="confirmation-buttons">
              <button className="home-btn" onClick={() => (window.location.href = "/")}>Accueil</button>
              <button className="new-btn" onClick={resetForm}>Nouvelle demande</button>
            </div>
          </div>
        )}
      </div>
      {showConfetti && <div className="confetti-container"></div>}
    </div>
  );
};

export default VoyagePersonnalise;