import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Users, Calendar, Euro } from "lucide-react";
import Swal from "sweetalert2";
import "./Accueil.css";

// ASSETS
import Discount from "../../assets/images/discount.png";
import HeroV from "../../assets/images/HeroV.mp4";

// SERVICES
import { GetVoyage2 } from "../../services/voyages";
import { Perso } from "../../services/perso";

const STRAPI_URL = "http://localhost:1337";

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className={`faq-item ${isOpen ? "open" : ""}`}>
    <button className="faq-question" onClick={onToggle}>
      <span className="question-text">{question}</span>
      <span className={`faq-icon ${isOpen ? "rotated" : ""}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
    <div className="faq-answer-wrapper">
      <div className="faq-answer"><p>{answer}</p></div>
    </div>
  </div>
);

const Accueil = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openFAQIndex, setOpenFAQIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    Destination: "", 
    nbr: 1, 
    date: "", 
    budget: ""
  });

  const faqs = t("home.faq.items", { returnObjects: true }) || [];

  useEffect(() => {
    fetchVoyages(1);
  }, []);

  const fetchVoyages = (pageNum) => {
    setLoadingMore(true);
    GetVoyage2(pageNum, 10)
      .then((res) => {
        const newData = res.data.data;
        const meta = res.data.meta.pagination;
        setDestinations(prev => (pageNum === 1 ? newData : [...prev, ...newData]));
        setHasMore(meta.page < meta.pageCount);
        setLoadingMore(false);
      })
      .catch((err) => {
        console.error("Error fetching voyages:", err);
        setLoadingMore(false);
      });
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVoyages(nextPage);
  };

  const handlePersoSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    if (!token) {
      Swal.fire({
        icon: "info",
        title: t("home.alerts.login_required_title"),
        text: t("home.alerts.login_required_text"),
        showCancelButton: true,
        confirmButtonText: t("home.alerts.login_btn"),
        cancelButtonText: t("home.alerts.later_btn"),
        confirmButtonColor: "#1a1c3d",
      }).then((result) => {
        if (result.isConfirmed) navigate("/SignIn");
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await Perso(formData, null, token);
      Swal.fire({
        icon: "success",
        title: t("home.alerts.success_title"),
        text: t("home.alerts.success_text"),
        confirmButtonColor: "#1a1c3d",
        timer: 3500
      });
      setFormData({ Destination: "", nbr: 1, date: "", budget: "" });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: t("home.alerts.error_title"),
        text: t("home.alerts.error_text"),
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="accueil-page">
      <section className="hero-form-section">
        <div className="hero-wrapper">
          <video src={HeroV} className="hero-bg" autoPlay loop muted playsInline></video>
          <div className="form-card">
            <h2 className="form-title">{t("home.hero.title")}</h2>
            <form className="custom-form" onSubmit={handlePersoSubmit}>
              <div className="form-row">
                <div className="input-wrapper">
                  <label>{t("home.hero.dest_label")}</label>
                  <div className="input-with-icon">
                    <MapPin size={18} />
                    <input 
                      type="text" placeholder={t("home.hero.dest_placeholder")} value={formData.Destination}
                      onChange={(e) => setFormData({...formData, Destination: e.target.value})} required
                    />
                  </div>
                </div>
                <div className="input-wrapper">
                  <label>{t("home.hero.pax_label")}</label>
                  <div className="input-with-icon">
                    <Users size={18} />
                    <input type="number" min="1" value={formData.nbr} onChange={(e) => setFormData({...formData, nbr: e.target.value})} />
                  </div>
                </div>
                <div className="input-wrapper">
                  <label>{t("home.hero.date_label")}</label>
                  <div className="input-with-icon">
                    <Calendar size={18} />
                    <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="form-row budget-row">
                <div className="input-wrapper">
                  <label>{t("home.hero.budget_label")}</label>
                  <div className="input-with-icon">
                    <Euro size={18} />
                    <input type="number" placeholder="DZD" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
                  </div>
                </div>
                <div className="submit-wrapper">
                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? t("home.hero.btn_loading") : t("home.hero.btn_send")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="destinations-section">
        <div className="destinations-container">
          <div className="destinations-header">
            <span className="section-badge">{t("home.destinations.badge")}</span>
            <h2 className="section-title">{t("home.destinations.title")}</h2>
          </div>
          
          <div className="destinations-grid">
            {destinations.map((dest) => (
              <Link to={`/details/${dest.documentId}`} key={dest.id} className="destination-card">
                <div className="card-image">
                  <img src={dest.image?.[0] ? `${STRAPI_URL}${dest.image[0].url}` : "https://via.placeholder.com/400"} alt={dest.name} />
                </div>
                <div className="card-content">
                  <h3>{dest.name}</h3>
                  <p>{dest.description?.substring(0, 85)}...</p>
                  <div className="card-footer">
                    <span className="price">{dest.price?.toLocaleString()} {t("home.destinations.currency")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="voir-plus-wrapper">
              <button className="voir-plus-btn" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? t("home.destinations.loading") : t("home.destinations.load_more")}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="family-promo-section">
        <div className="family-promo-container">
          <div className="family-content">
            <h2 className="family-title">{t("home.promo.title")}</h2>
            <p>{t("home.promo.subtitle")}</p>
            <button className="family-cta">{t("home.promo.cta")}</button>
          </div>
          <div className="family-image-wrapper">
            <img src={Discount} alt="Promo" className="family-image" />
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <span className="faq-badge">{t("home.faq.badge")}</span>
            <h2 className="faq-title">{t("home.faq.title")}</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <FAQItem 
                key={index} 
                question={item.q} 
                answer={item.a}
                isOpen={openFAQIndex === index} 
                onToggle={() => setOpenFAQIndex(openFAQIndex === index ? -1 : index)} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accueil;