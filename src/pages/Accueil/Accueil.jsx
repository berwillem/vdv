import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, Calendar, Euro } from "lucide-react";
import "./Accueil.css";

// ASSETS
import Discount from "../../assets/images/discount.png";
import HeroV from "../../assets/images/HeroV.mp4";

// SERVICES
import { GetVoyage2 } from "../../services/voyages";
import { Perso } from "../../services/perso";

const STRAPI_URL = "http://localhost:1337";

// --- COMPOSANT FAQ ITEM (Inchangé) ---
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
  const [openFAQIndex, setOpenFAQIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);
  
  // --- ÉTATS PAGINATION BACKEND ---
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Formulaire Perso Trip
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    Destination: "", nbr: 1, date: "", budget: ""
  });

  // --- CHARGEMENT INITIAL ---
  useEffect(() => {
    fetchVoyages(1);
  }, []);

  const fetchVoyages = (pageNum) => {
    setLoadingMore(true);
    GetVoyage2(pageNum, 10) //
      .then((res) => {
        const newData = res.data.data;
        const meta = res.data.meta.pagination;

        // On concatène les nouveaux voyages aux anciens
        setDestinations(prev => (pageNum === 1 ? newData : [...prev, ...newData]));
        
        // On vérifie s'il reste des pages à charger
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
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token"); // Utilise "token" ou "jwt" selon ton storage
      if (!token) {
        alert("Veuillez vous connecter pour envoyer une demande personnalisée.");
        return;
      }
      await Perso(formData, null, token);
      alert("Demande envoyée avec succès !");
      setFormData({ Destination: "", nbr: 1, date: "", budget: "" });
    } catch (err) {
      console.error("Erreur envoi Perso:", err);
      alert("Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    { question: "Comment puis-je réserver un voyage ?", answer: "Vous pouvez réserver directement sur notre site..." },
    { question: "Dois-je payer la totalité ?", answer: "Non, un acompte de 30% suffit..." },
    { question: "Qu'est-ce qu'un voyage personnalisé ?", answer: "C’est un voyage conçu sur mesure selon vos envies..." }
  ];

  return (
    <>
      <section className="hero-form-section">
        <div className="hero-wrapper">
          <video src={HeroV} className="hero-bg" autoPlay loop muted></video>
          <div className="form-card">
            <h2 className="form-title">Voyage personnalisé</h2>
            <form className="custom-form" onSubmit={handlePersoSubmit}>
              <div className="form-row">
                <div className="input-wrapper">
                  <label>Destination</label>
                  <div className="input-with-icon">
                    <MapPin size={18} />
                    <input 
                      type="text" placeholder="Où ?" value={formData.Destination}
                      onChange={(e) => setFormData({...formData, Destination: e.target.value})} required
                    />
                  </div>
                </div>
                <div className="input-wrapper">
                  <label>Personnes</label>
                  <div className="input-with-icon">
                    <Users size={18} />
                    <input type="number" value={formData.nbr} onChange={(e) => setFormData({...formData, nbr: e.target.value})} />
                  </div>
                </div>
                <div className="input-wrapper">
                  <label>Date</label>
                  <div className="input-with-icon">
                    <Calendar size={18} />
                    <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="form-row budget-row">
                <div className="input-wrapper">
                  <label>Budget</label>
                  <div className="input-with-icon">
                    <Euro size={18} />
                    <input type="number" placeholder="DZD" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
                  </div>
                </div>
                <div className="submit-wrapper">
                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi..." : "Envoyer votre demande"}
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
            <span className="section-badge">Une sélection de voyage</span>
            <h2 className="section-title">Destination populaire</h2>
          </div>
          
          <div className="destinations-grid">
            {destinations.map((dest, i) => (
              <Link to={`/details/${dest.documentId}`} key={i} className="destination-card">
                <div className="card-image">
                  <img src={dest.image?.[0] ? `${STRAPI_URL}${dest.image[0].url}` : "https://via.placeholder.com/400"} alt={dest.name} />
                </div>
                <div className="card-content">
                  <h3>{dest.name}</h3>
                  <p>{dest.description?.substring(0, 80)}...</p>
                  <span className="price">{dest.price?.toLocaleString()} DA</span>
                </div>
              </Link>
            ))}
          </div>

          {/* BOUTON VOIR PLUS GÉRÉ PAR LE BACKEND */}
          {hasMore && (
            <div className="voir-plus-wrapper">
              <button className="voir-plus-btn" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? "Chargement..." : "Voir plus"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PROMO FAMILLE ET FAQ (Inchangés) */}
      <section className="family-promo-section">
        <div className="family-promo-container">
          <div className="family-content">
            <h2 className="family-title">Des réductions sur les <br /> voyages en famille</h2>
            <button className="family-cta">Découvrez dès maintenant</button>
          </div>
          <div className="family-image-wrapper"><img src={Discount} alt="Promo" className="family-image" /></div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <span className="faq-badge">FAQs</span>
            <h2 className="faq-title">Questions fréquemment posées</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer}
                isOpen={openFAQIndex === index} onToggle={() => setOpenFAQIndex(index)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Accueil;