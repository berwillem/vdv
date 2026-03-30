import React from "react";
import { useTranslation } from "react-i18next";
import "./APropos.css";

const About = () => {
  const { t } = useTranslation();

  // On récupère les tableaux d'objets depuis le JSON
  const valueItems = t("about.values.items", { returnObjects: true }) || [];
  const engagementItems = t("about.engagements.items", { returnObjects: true }) || [];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero" />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>{t("about.breadcrumb")}</span>
      </div>

      <h1 className="title">{t("about.main_title")}</h1>

      <div className="content">
        {/* Histoire */}
        <h2 className="section-title">{t("about.history.title")}</h2>
        <div className="history-text">
          <p>{t("about.history.p1")}</p>
          <p>{t("about.history.p2")}</p>
          <p>{t("about.history.p3")}</p>
          <p>{t("about.history.p4")}</p>
          <p>{t("about.history.p5")}</p>
        </div>

        {/* Valeurs - Utilisation du MAP */}
        <h2 className="section-title">{t("about.values.title")}</h2>
        <ul>
          {Array.isArray(valueItems) && valueItems.map((item, index) => (
            <li key={index}>
              <strong>{item.bold}</strong> {item.text}
            </li>
          ))}
        </ul>

        {/* Vision */}
        <h2 className="section-title">{t("about.vision.title")}</h2>
        <p className="vision">{t("about.vision.text")}</p>

        {/* Engagements - Utilisation du MAP */}
        <h2 className="section-title section-title-uppercase">{t("about.engagements.title")}</h2>
        <ul>
          {Array.isArray(engagementItems) && engagementItems.map((item, index) => (
            <li key={index}>
              <strong>{item.bold}</strong> {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;