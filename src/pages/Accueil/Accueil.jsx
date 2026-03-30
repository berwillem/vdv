import React, { useState, useEffect } from "react";
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

// --- COMPOSANT FAQ ITEM ---
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
  const navigate = useNavigate();
  const [openFAQIndex, setOpenFAQIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);
  
  // --- ÉTATS PAGINATION ---
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // --- ÉTAT FORMULAIRE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    Destination: "", 
    nbr: 1, 
    date: "", 
    budget: ""
  });

  // --- CHARGEMENT INITIAL ---
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

  // --- GESTION DU FORMULAIRE AVEC SWEETALERT ---
  const handlePersoSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("jwt"); // Vérifie le token (jwt ou token selon ton app)

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
          navigate("/SignIn");
        }
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await Perso(formData, null, token);
      
      Swal.fire({
        icon: "success",
        title: "Demande envoyée !",
        text: "Votre projet de voyage a été transmis à nos conseillers.",
        confirmButtonColor: "#1a1c3d",
        timer: 3500
      });

      setFormData({ Destination: "", nbr: 1, date: "", budget: "" });
    } catch (err) {
      console.error("Erreur envoi Perso:", err);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible d'envoyer la demande. Veuillez réessayer.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    { question: "Comment puis-je réserver un voyage ?", answer: "Sélectionnez votre destination, choisissez vos dates et cliquez sur réserver pour finaliser votre paiement." },
    { question: "Dois-je payer la totalité immédiatement ?", answer: "Non, un acompte est possible selon les conditions spécifiques de chaque voyage." },
    { question: "Qu'est-ce qu'un voyage personnalisé ?", answer: "C'est une offre sur mesure où vous définissez votre budget et vos préférences, et nous créons l'itinéraire pour vous." }
  ];

  return (
    <div className="accueil-page">
      {/* SECTION HERO & FORMULAIRE */}
      <section className="hero-form-section">
        <div className="hero-wrapper">
          <video src={HeroV} className="hero-bg" autoPlay loop muted playsInline></video>
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
                    <input type="number" min="1" value={formData.nbr} onChange={(e) => setFormData({...formData, nbr: e.target.value})} />
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
                  <label>Budget souhaité</label>
                  <div className="input-with-icon">
                    <Euro size={18} />
                    <input type="number" placeholder="DZD" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
                  </div>
                </div>
                <div className="submit-wrapper">
                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? "Traitement..." : "Envoyer ma demande"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION DESTINATIONS */}
      <section className="destinations-section">
        <div className="destinations-container">
          <div className="destinations-header">
            <span className="section-badge">Notre Sélection</span>
            <h2 className="section-title">Destinations populaires</h2>
          </div>
          
          <div className="destinations-grid">
            {destinations.map((dest) => (
              <Link to={`/details/${dest.documentId}`} key={dest.id} className="destination-card">
                <div className="card-image">
                  <img 
                    src={dest.image?.[0] ? `${STRAPI_URL}${dest.image[0].url}` : "https://via.placeholder.com/400"} 
                    alt={dest.name} 
                  />
                </div>
                <div className="card-content">
                  <h3>{dest.name}</h3>
                  <p>{dest.description?.substring(0, 85)}...</p>
                  <div className="card-footer">
                    <span className="price">{dest.price?.toLocaleString()} DZD</span>
               
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="voir-plus-wrapper">
              <button className="voir-plus-btn" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? "Chargement..." : "Charger plus de destinations"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION PROMO FAMILLE */}
      <section className="family-promo-section">
        <div className="family-promo-container">
          <div className="family-content">
            <h2 className="family-title">Des réductions exclusives <br /> pour les voyages en famille</h2>
            <p>Profitez de tarifs préférentiels pour vos enfants et des activités adaptées.</p>
            <button className="family-cta">Découvrir les offres</button>
          </div>
          <div className="family-image-wrapper">
            <img src={Discount} alt="Promo" className="family-image" />
          </div>
        </div>
      </section>

      {/* SECTION FAQ */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <span className="faq-badge">Aide</span>
            <h2 className="faq-title">Questions fréquentes</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <FAQItem 
                key={index} 
                question={item.question} 
                answer={item.answer}
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