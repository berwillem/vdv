import "./Footer.css";

import Background from "../../../assets/images/Herobackground.jpg";

export default function Footer() {
  return (
    <div>
      {/* FOOTER */}
      <footer className="footer">
        {/* CTA Banner */}
        <div className="footer-cta">
          <img
            src={Background}
            alt="Voyage passionnant"
            className="footer-cta-bg"
          />
          <div className="footer-cta-content">
            <h2>
              Préparez-vous dès aujourd’hui
              <br />
              pour un voyage passionnant
            </h2>
            <p>
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry.
              <br />
              Lorem ipsum has been the industry's standard dummy text ever since
              the 1500s
            </p>
            <button className="footer-cta-btn">Contactez-nous</button>
          </div>
        </div>

        {/* Main Footer */}
        <div className="footer-main">
          <div className="footer-main-container">
            {/* Logo + Description */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span>Village</span> Des Voyages
              </div>
              <p>
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry.
                <br />
                Lorem ipsum has been the industry's standard dummy text ever
                since the 1500s
              </p>
            </div>

            {/* Support */}
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#">Service client</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
                <li>
                  <a href="#">Feedback</a>
                </li>
                <li>
                  <a href="#">Contact d’urgence</a>
                </li>
              </ul>
            </div>

            {/* Entreprise */}
            <div className="footer-column">
              <h4>Entreprise</h4>
              <ul>
                <li>
                  <a href="#">Localisation</a>
                </li>
                <li>
                  <a href="#">À propos de nous</a>
                </li>
                <li>
                  <a href="#">Carrière</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>

            {/* Légal */}
            <div className="footer-column">
              <h4>Légal</h4>
              <ul>
                <li>
                  <a href="#">Politique de remboursement</a>
                </li>
                <li>
                  <a href="#">Conditions générales d’utilisation</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>Copyright © Binnovant 2025</p>
          </div>
        </div>
      </footer>
      ;
    </div>
  );
}
