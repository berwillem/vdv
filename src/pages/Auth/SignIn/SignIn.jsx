// src/pages/Auth/Login/Login.jsx
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import "./SignIn.css";

const Login = () => {
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    alert(`Reset link sent to ${resetEmail}`);
    setShowForgot(false);
    setResetEmail("");
  };

  return (
    <div className="login-container">
      <button
        className="back-home-btn"
        onClick={() => (window.location.href = "/")}
      >
        <FaArrowLeft />
      </button>
      {/* Background Hero */}
      <div className="login-hero" />

      {/* Login Card */}
      <div className="login-card">
        <h1 className="login-title">Bienvenue</h1>
        <p className="login-subtitle">
          Connectez-vous à votre compte Village de Voyage
        </p>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="votre@email.com" required />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <div className="forgot-link">
            <button
              type="button"
              className="link-btn"
              onClick={() => setShowForgot(true)}
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Se connecter
          </button>
        </form>

        <p className="signup-text">
          Pas de compte ?{" "}
          <a href="/register" className="link-btn">
            Inscrivez-vous
          </a>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="modal-overlay" onClick={() => setShowForgot(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Réinitialiser le mot de passe</h2>
            <p className="modal-subtitle">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
            <form onSubmit={handleForgotSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForgot(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="submit-btn">
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
