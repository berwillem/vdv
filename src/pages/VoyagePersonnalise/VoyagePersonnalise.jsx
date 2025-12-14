// src/pages/VoyagePersonnalise/VoyagePersonnalise.jsx
import React, { useState, useEffect } from "react";
import "./VoyagePersonnalise.css";

const VoyagePersonnalise = () => {
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Nouvel état pour la confirmation
  const [formData, setFormData] = useState({
    where: "",
    people: 1,
    budget: 50000,
    date: "",
    style: "Aventure",
  });

  const totalSteps = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.where.trim() !== "";
      case 2:
        return formData.people >= 1;
      case 3:
        return formData.budget >= 0;
      case 4:
        return formData.date !== "";
      case 5:
        return formData.style !== "";
      default:
        return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setShowConfetti(true);
      setIsSubmitted(true);
      setTimeout(() => setShowConfetti(false), 8000);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setFormData({
      where: "",
      people: 1,
      budget: 50000,
      date: "",
      style: "Aventure",
    });
  };

  // Confetti effect
  useEffect(() => {
    if (showConfetti) {
      const travelEmojis = [
        "✈️",
        "🧳",
        "🌴",
        "🏔️",
        "🌍",
        "🏖️",
        "⛵",
        "🏰",
        "🌺",
        "🚞",
        "🗺️",
        "🌅",
        "🏝️",
        "🚁",
        "🎒",
        "🌟",
        "🗼",
        "🕌",
        "🚤",
        "🏞️",
      ];

      const interval = setInterval(() => {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.textContent =
          travelEmojis[Math.floor(Math.random() * travelEmojis.length)];
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 4 + 3 + "s";
        confetti.style.fontSize = Math.random() * 30 + 20 + "px";
        confetti.style.opacity = Math.random() * 0.8 + 0.5;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 8000);
      }, 120);

      return () => clearInterval(interval);
    }
  }, [showConfetti]);

  return (
    <div className="vp-container">
      {/* Contenu principal */}
      <div className="vp-content">
        {!isSubmitted ? (
          <>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
              <p className="progress-text">
                Étape {step} sur {totalSteps}
              </p>
            </div>

            <div className="step-card">
              <form className="vp-form" onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">Où rêvez-vous d'aller ?</h2>
                    <input
                      type="text"
                      name="where"
                      value={formData.where}
                      onChange={handleChange}
                      placeholder="Paris, Bali, New York, Sahara..."
                      required
                    />
                  </div>
                )}
                {step === 2 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">Combien de voyageurs ?</h2>
                    <input
                      type="number"
                      name="people"
                      value={formData.people}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                )}
                {step === 3 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">Budget par personne (DZD)</h2>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      min="0"
                      step="5000"
                      required
                    />
                  </div>
                )}
                {step === 4 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">
                      Quand souhaitez-vous partir ?
                    </h2>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                {step === 5 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">Quel style de voyage ?</h2>
                    <select
                      name="style"
                      value={formData.style}
                      onChange={handleChange}
                      required
                    >
                      <option value="Aventure">Aventure & Découverte</option>
                      <option value="Relaxation">Relaxation & Plage</option>
                      <option value="Culturel">Culture & Patrimoine</option>
                      <option value="Familial">Familial</option>
                      <option value="Luxe">Luxe & Prestige</option>
                      <option value="Nature">Nature & Écotourisme</option>
                    </select>
                  </div>
                )}

                <div className="step-buttons">
                  {step > 1 && (
                    <button
                      type="button"
                      className="prev-btn"
                      onClick={prevStep}
                    >
                      Précédent
                    </button>
                  )}
                  {step < totalSteps ? (
                    <button
                      type="button"
                      className="next-btn"
                      onClick={nextStep}
                    >
                      Suivant
                    </button>
                  ) : (
                    <button type="submit" className="submit-btn">
                      Finaliser ma demande 🎉
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        ) : (
          /* Écran de confirmation */
          <div className="confirmation-card fade-in">
            <h2 className="confirmation-title">Félicitations ! 🎉</h2>
            <p className="confirmation-message">
              Votre demande a été envoyée avec succès !<br />
              Notre équipe vous contactera dans les plus brefs délais pour
              finaliser votre voyage sur mesure.
            </p>

            <div className="contact-summary">
              <h3>Votre demande en résumé :</h3>
              <ul>
                <li>
                  <strong>Destination :</strong>{" "}
                  {formData.where || "Non spécifiée"}
                </li>
                <li>
                  <strong>Voyageurs :</strong> {formData.people}
                </li>
                <li>
                  <strong>Budget par personne :</strong>{" "}
                  {formData.budget.toLocaleString()} DZD
                </li>
                <li>
                  <strong>Date :</strong> {formData.date || "Flexible"}
                </li>
                <li>
                  <strong>Style :</strong> {formData.style}
                </li>
              </ul>
            </div>

            <div className="confirmation-buttons">
              <button
                className="home-btn"
                onClick={() => (window.location.href = "/")}
              >
                Retour à l'accueil
              </button>
              <button className="new-btn" onClick={resetForm}>
                Envoyer une autre demande
              </button>
            </div>

            <div className="contact-info-final">
              <p>
                <strong>Une question ?</strong> Contactez-nous :
              </p>
              <p>Tél : 021 37 17 05 | Mobile : 0556 26 08 87</p>
              <p>Email : contact@villagedevoyage.dz</p>
            </div>
          </div>
        )}
      </div>

      {/* Confetti full-page */}
      {showConfetti && <div className="confetti-container"></div>}
    </div>
  );
};

export default VoyagePersonnalise;
