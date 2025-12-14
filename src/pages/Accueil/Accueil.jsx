import { MapPin, Users, Calendar, Euro } from "lucide-react";
import { useState } from "react";
import Discount from "../../assets/images/discount.png";
import HeroV from "../../assets/images/HeroV.mp4";

// ANIMATION

import "./Accueil.css";

// DESTINATIONS DATA (unchanged)
const destinations = [
  {
    name: "Bracelet d'Argent",
    description: "Located in the heart of the Djurdjura Mountains...",
    price: "DZD 8.500,00",
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Bracelet d'Argent",
    description: "Located in the heart of the Djurdjura Mountains...",
    price: "DZD 8.500,00",
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Bracelet d'Argent",
    description: "Located in the heart of the Djurdjura Mountains...",
    price: "DZD 8.500,00",
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Bracelet d'Argent",
    description: "Located in the heart of the Djurdjura Mountains...",
    price: "DZD 8.500,00",
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Bracelet d'Argent",
    description: "Located in the heart of the Djurdjura Mountains...",
    price: "DZD 8.500,00",
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Bracelet d'Argent",
    description: "Located in the heart of the Djurdjura Mountains...",
    price: "DZD 8.500,00",
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Bracelet d'Argent",
    description: "Located in the heart of the Djurdjura Mountains...",
    price: "DZD 8.500,00",
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Bracelet d'Argent",
    description: "Located in the heart of the Djurdjura Mountains...",
    price: "DZD 8.500,00",
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Bracelet d'Argent",
    description: "Located in the heart of the Djurdjura Mountains...",
    price: "DZD 8.500,00",
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=800&auto=format&fit=crop",
  },
];

// FAQ DATA
const faqs = [
  {
    question: "Comment puis-je réserver un voyage ?",
    answer:
      "Vous pouvez réserver directement sur notre site, via notre formulaire de réservation, ou en nous contactant par téléphone ou WhatsApp. Un conseiller vous accompagne dans chaque étape.",
  },
  {
    question: "Dois-je payer la totalité du voyage à la réservation ?",
    answer:
      "Non, un acompte de 30% suffit pour bloquer votre voyage. Le solde est à régler 30 jours avant le départ.",
  },
  {
    question: "Qu'est-ce qu'un voyage organisé ?",
    answer:
      "Un voyage organisé inclut vols, hébergements, transferts, repas et activités guidées. Tout est pris en charge pour vous offrir une expérience sans stress.",
  },
  {
    question: "Qu'est-ce qu'un voyage personnalisé ?",
    answer:
      "C’est un voyage conçu sur mesure selon vos envies : destinations, rythme, budget, activités exclusives… Vous rêvez, nous réalisons.",
  },
  {
    question: "Les voyages personnalisés coûtent-ils plus cher ?",
    answer:
      "Pas forcément ! Grâce à nos partenariats locaux, nous proposons souvent des tarifs plus avantageux que les circuits classiques.",
  },
  {
    question:
      "Proposez-vous des voyages pour groupes privés (familles, entreprises) ?",
    answer:
      "Oui ! Mariages, séminaires, incentives, anniversaires… nous créons des expériences uniques pour tous les groupes.",
  },
];

// FAQ ITEM COMPONENT
const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button className="faq-question" onClick={onToggle}>
        <span className="question-text">{question}</span>
        <span className={`faq-icon ${isOpen ? "rotated" : ""}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div className="faq-answer-wrapper">
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};
const Accueil = () => {
  // ALWAYS ONE FAQ OPEN — starts with first one
  const [openFAQIndex, setOpenFAQIndex] = useState(0);
  return (
    <>
      {/* HERO + PERSONALISED FORM */}
      <section className="hero-form-section">
        <div className="hero-wrapper">
          <video src={HeroV} className="hero-bg" autoPlay loop></video>
          <div className="form-card">
            <h2 className="form-title">Voyage personnalisé</h2>

            <form className="custom-form">
              <div className="form-row">
                <div className="input-wrapper">
                  <label>Destination</label>
                  <div className="input-with-icon">
                    <MapPin size={18} />
                    <input type="text" placeholder="Où voulez-vous aller ?" />
                  </div>
                </div>
                <div className="input-wrapper">
                  <label>Nombre de personne</label>
                  <div className="input-with-icon">
                    <Users size={18} />
                    <input type="number" placeholder="1" min="1" />
                  </div>
                </div>
                <div className="input-wrapper">
                  <label>Date de départ</label>
                  <div className="input-with-icon">
                    <Calendar size={18} />
                    <input type="date" />
                  </div>
                </div>
                <div className="input-wrapper">
                  <label>Date de retour</label>
                  <div className="input-with-icon">
                    <Calendar size={18} />
                    <input type="date" />
                  </div>
                </div>
              </div>
              <div className="form-row budget-row">
                <div className="input-wrapper">
                  <label>Budget par personne</label>
                  <div className="input-with-icon">
                    <Euro size={18} />
                    <input type="number" placeholder="15.000,00 DZD" />
                  </div>
                </div>
                <div className="submit-wrapper">
                  <button type="submit" className="submit-button">
                    Envoyé votre demande
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* MEILLEURES OFFRES */}
      <section className="offers-section">
        {" "}
        {/* ... votre section offres ... */}{" "}
      </section>

      {/* DESTINATIONS POPULAIRES */}
      <section className="destinations-section">
        <div className="destinations-container">
          <div className="destinations-header">
            <span className="section-badge">Une sélection de voyage</span>
            <h2 className="section-title">Destination populaire</h2>
          </div>
          <div className="destinations-grid">
            {destinations.map((dest, i) => (
              <div key={i} className="destination-card">
                <div className="card-image">
                  <img src={dest.image} alt={dest.name} />
                </div>
                <div className="card-content">
                  <h3>{dest.name}</h3>
                  <p>{dest.description}</p>
                  <span className="price">{dest.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="voir-plus-wrapper">
            <button className="voir-plus-btn">Voir plus</button>
          </div>
        </div>
      </section>

      {/* PROMO FAMILLE */}
      <section className="family-promo-section">
        <div className="family-promo-container">
          <div className="family-content">
            <h2 className="family-title">
              Des réductions sur les
              <br />
              voyages en famille
            </h2>
            <button className="family-cta">Découvrez dès maintenant</button>
          </div>
          <div className="family-image-wrapper">
            <img
              src={Discount}
              alt="Famille dans le désert"
              className="family-image"
            />
          </div>
        </div>
      </section>

      {/* FAQ SECTION — PERFECTLY FIXED */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <span className="faq-badge">FAQs</span>
            <h2 className="faq-title">Questions fréquemment posées</h2>
          </div>

          <div className="faq-list">
            {faqs.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQIndex === index}
                onToggle={() => setOpenFAQIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Accueil;
