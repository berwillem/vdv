// src/pages/About.jsx
import React from "react";
import "./APropos.css"; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero" />

      {/* Main Content */}
      <div className="breadcrumb">
        <span>À propos de</span>
      </div>

      <h1 className="title">Village de voyage</h1>

      <div className="content">
        {/* Histoire */}
        <h2 className="section-title">Histoire</h2>
        <p>
          Depuis 2014, notre agence accompagne les voyageurs dans la création
          d'expériences uniques et authentiques. Composée d'une équipe jeune,
          passionnée et dynamique, nous mettons toute notre énergie au service
          de vos envies de découverte.
        </p>
        <p>
          À la tête de l'agence, une diplômée de l'Écule Nationale Supérieure du
          Tourisme, dont l'expertise et la passion pour le voyage ont permis de
          bâtir une entreprise sulide, innovante et orientée client.
        </p>
        <p>
          Au fil des années, nous avons organisé des voyages dans plus de 15
          destinations internationales, et conçu plus de 15 circuits nationaux,
          pensés pour répondre aux attentes des voyageurs les plus exigeants.
        </p>
        <p>
          Notre philosophie est simple : être au service du client, lui offrir
          le meilleur plan au meilleur prix, et garantir une expérience de
          voyage fluide, sécurisée et mémorable.
        </p>
        <p>
          Que vous rêviez d'aventure, de détente ou d'un séjour sur mesure, nous
          sommes là pour vous accompagner à chaque étape. Votre satisfaction est
          notre priorité, et votre voyage, notre passion.
        </p>

        {/* Valeurs */}
        <h2 className="section-title">Valeurs de l'entreprise</h2>
        <ul>
          <li>
            <strong>1. Excellence du service</strong>
            Chaque voyage mérite une attention particulière. Nous mettons tout
            en œuvre pour offrir des prestations irréprochables, du premier
            contact jusqu'au retour du client.
          </li>
          <li>
            <strong>2. Satisfaction client</strong>
            Votre satisfaction est notre priorité absulue. Nous écoutons, nous
            conseillons et nous adaptons chaque expérience en fonction de vos
            besoins et de vos envies.
          </li>
          <li>
            <strong>3. Innovation & créativité</strong>
            Nous ne proposons pas seulement des voyages : nous créons des
            expériences uniques. Notre équipe innove en permanence pour vous
            offrir les meilleures idées et les meilleures offres.
          </li>
          <li>
            <strong>4. Passion du voyage</strong>
            C'est notre moteur. Parce que nous aimons ce que nous faisons, nous
            sommes capables de créer des expériences inoubliables pour ceux qui
            voyagent avec nous.
          </li>
        </ul>

        {/* Vision */}
        <h2 className="section-title">Notre vision chez village des voyage</h2>
        <p className="vision">
          Devenir une agence de référence dans le tourisme national et
          international, reconnue pour son sens du service, sa créativité et sa
          capacité à offrir le meilleur rapport qualité-prix du marché.
          <br />
          Nous aspirons à inspirer les voyageurs, à faciliter leur mobilité et à
          leur faire découvrir le monde en toute confiance.
        </p>

        {/* Engagements */}
        <h2 className="section-title section-title-uppercase">Engagements</h2>
        <ul>
          <li>
            <strong>1. Des prix justes et compétitifs</strong>
            Nous négocions continuellement les meilleures offres pour garantir
            des tarifs attractifs sans compromis sur la qualité.
          </li>
          <li>
            <strong>2. Un accompagnement personnalisé</strong>
            Chaque client est unique. Nous proposons des conseils sur mesure,
            adaptés à votre budget, votre style et vos attentes.
          </li>
          <li>
            <strong>3. Une disponibilité totale</strong>
            Notre équipe jeune et dynamique est toujours à votre écoute pour
            répondre à vos questions, avant, pendant et après votre voyage.
          </li>
          <li>
            <strong>4. La sécurité avant tout</strong>
            Nous sélectionnons des partenaires fiables et contrôlons
            rigoureusement chaque étape du voyage.
          </li>
          <li>
            <strong>5. Une expérience client améliorée en continu</strong>
            Grâce à vos retours, nous optimisons nos circuits, nos prestations
            et nos services, jour après jour.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
