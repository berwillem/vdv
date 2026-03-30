import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./VoyagePersonnalise.css";
import { Perso } from "../../services/perso";

const VoyagePersonnalise = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const validateStep = () => {
    switch (step) {
      case 1: return formData.Destination.trim() !== "";
      case 2: return formData.nbr >= 1;
      case 3: return formData.budget >= 0;
      case 4: return formData.date !== "";
      default: return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      Swal.fire({
        icon: "warning",
        title: t("vp.alerts.required_title"),
        text: t("vp.alerts.required_text"),
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
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
          title: t("vp.alerts.login_required_title"),
          text: t("vp.alerts.login_required_text"),
          showCancelButton: true,
          confirmButtonText: t("vp.alerts.login_confirm"),
          cancelButtonText: t("vp.alerts.login_cancel"),
          confirmButtonColor: "#1a1c3d",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/SignIn");
          }
        });
        setLoading(false);
        return;
      }

      const user = JSON.parse(userStorage);
      const userIdentifier = user.id;

      try {
        await Perso(formData, userIdentifier, token);

        Swal.fire({
          icon: "success",
          title: t("vp.alerts.success_title"),
          text: t("vp.alerts.success_text"),
          timer: 3000,
          showConfirmButton: false,
        });

        setShowConfetti(true);
        setIsSubmitted(true);
        setTimeout(() => setShowConfetti(false), 8000);
      } catch (error) {
        const errorMsg = error.response?.data?.error?.message;
        Swal.fire({
          icon: "error",
          title: t("vp.alerts.error_title"),
          text: errorMsg === "Forbidden" ? t("vp.alerts.error_forbidden") : t("vp.alerts.error_generic"),
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
              <p className="progress-text">{t("vp.steps.progress", { current: step, total: totalSteps })}</p>
            </div>

            <div className="step-card">
              <form className="vp-form" onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">{t("vp.steps.step1_title")}</h2>
                    <input type="text" name="Destination" value={formData.Destination} onChange={handleChange} placeholder={t("vp.steps.step1_placeholder")} required />
                  </div>
                )}
                {step === 2 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">{t("vp.steps.step2_title")}</h2>
                    <input type="number" name="nbr" value={formData.nbr} onChange={handleChange} min="1" required />
                  </div>
                )}
                {step === 3 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">{t("vp.steps.step3_title")}</h2>
                    <input type="number" name="budget" value={formData.budget} onChange={handleChange} min="0" step="5000" required />
                  </div>
                )}
                {step === 4 && (
                  <div className="step-group fade-in">
                    <h2 className="step-title">{t("vp.steps.step4_title")}</h2>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                  </div>
                )}

                <div className="step-buttons">
                  {step > 1 && (
                    <button type="button" className="prev-btn" onClick={prevStep} disabled={loading}>
                      {t("vp.steps.btn_prev")}
                    </button>
                  )}
                  {step < totalSteps ? (
                    <button type="button" className="next-btn" onClick={nextStep}>
                      {t("vp.steps.btn_next")}
                    </button>
                  ) : (
                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? t("vp.steps.sending") : t("vp.steps.btn_submit")}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="confirmation-card fade-in">
            <h2 className="confirmation-title">{t("vp.confirmation.title")}</h2>
            <p className="confirmation-message">{t("vp.confirmation.message")}</p>
            <div className="contact-summary">
              <h3>{t("vp.confirmation.summary_title")}</h3>
              <ul>
                <li><strong>{t("vp.confirmation.dest")}</strong> {formData.Destination}</li>
                <li><strong>{t("vp.confirmation.pax")}</strong> {formData.nbr}</li>
                <li dir="ltr"><strong>{t("vp.confirmation.budget")}</strong> {formData.budget.toLocaleString()} DZD</li>
                <li><strong>{t("vp.confirmation.date")}</strong> {formData.date}</li>
              </ul>
            </div>
            <div className="confirmation-buttons">
              <button className="home-btn" onClick={() => navigate("/")}>{t("vp.confirmation.btn_home")}</button>
              <button className="new-btn" onClick={resetForm}>{t("vp.confirmation.btn_new")}</button>
            </div>
          </div>
        )}
      </div>
      {showConfetti && <div className="confetti-container"></div>}
    </div>
  );
};

export default VoyagePersonnalise;