import { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import "./Entreprise.css";
import { PostContactEntreprise } from "../../services/entreprise";

const Entreprise = () => {
  const { t } = useTranslation();
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

      Swal.fire({
        icon: "success",
        title: t("entreprise.alerts.success_title"),
        text: t("entreprise.alerts.success_text"),
        confirmButtonColor: "#1a1c3d",
      });

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
        title: t("entreprise.alerts.error_title"),
        text: t("entreprise.alerts.error_text"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="entreprise-page">
      <div className="entreprise-hero"></div>
      <div className="entreprise-label">
        <div className="badge">{t("entreprise.hero.badge")}</div>
        <h1 className="hero-title">{t("entreprise.hero.title")}</h1>
      </div>

      <div className="encadrement-section">
        <div className="encadrement-grid">
          <div className="encadrement-block"></div>
          <div className="encadrement-block"></div>
          <div className="encadrement-block"></div>
        </div>
      </div>

      <div className="formulaire-section">
        <h2 className="formulaire-title">{t("entreprise.form.title")}</h2>

        <form onSubmit={handleSubmit} className="entreprise-form">
          <div className="form-row">
            <div className="form-group">
              <label>{t("entreprise.form.nom")}</label>
              <input type="text" name="nom" value={formData.nom} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label>{t("entreprise.form.prenom")}</label>
              <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div className="form-group full-width">
            <label>{t("entreprise.form.company")}</label>
            <input type="text" name="entreprise" value={formData.entreprise} onChange={handleChange} required disabled={loading} />
          </div>

          <div className="form-group full-width">
            <label>{t("entreprise.form.activity")}</label>
            <input type="text" name="domaine" value={formData.domaine} onChange={handleChange} required disabled={loading} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t("entreprise.form.email")}</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label>{t("entreprise.form.phone")}</label>
              <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t("entreprise.form.event_date")}</label>
              <input type="date" name="dateEvenement" value={formData.dateEvenement} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label>{t("entreprise.form.days_count")}</label>
              <input type="number" name="nombreJours" value={formData.nombreJours} onChange={handleChange} min="1" required disabled={loading} />
            </div>
          </div>

          <div className="form-group full-width radio-group">
            <label>{t("entreprise.form.transport_q")}</label>
            <div className="radio-options">
              <label>
                <input type="radio" name="transportBus" value="oui" checked={formData.transportBus === "oui"} onChange={handleChange} disabled={loading} />
                {t("entreprise.form.yes")}
              </label>
              <label>
                <input type="radio" name="transportBus" value="non" checked={formData.transportBus === "non"} onChange={handleChange} disabled={loading} />
                {t("entreprise.form.no")}
              </label>
            </div>
          </div>

          <div className="form-group full-width">
            <label>{t("entreprise.form.details")}</label>
            <textarea name="details" value={formData.details} onChange={handleChange} rows="6" placeholder={t("entreprise.form.details_placeholder")} disabled={loading} />
          </div>

          <button type="submit" className="envoyer-btn" disabled={loading}>
            {loading ? t("entreprise.form.sending") : t("entreprise.form.btn_send")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Entreprise;