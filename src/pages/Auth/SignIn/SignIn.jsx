import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Email ou Username
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Strapi utilise 'identifier' pour l'email ou le username
      const response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: identifier,
        password: password,
      });

      // Sauvegarde du JWT et des infos utilisateur
      localStorage.setItem("jwt", response.data.jwt);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/"); // Redirection vers l'accueil
    } catch (err) {
      console.error("Erreur de connexion:", err.response);
      setError(
        err.response?.data?.error?.message === "Invalid identifier or password"
          ? "Email ou mot de passe incorrect."
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1337/api/auth/forgot-password", {
        email: resetEmail,
      });
      alert(`Un lien de réinitialisation a été envoyé à ${resetEmail}`);
      setShowForgot(false);
      setResetEmail("");
    } catch (err) {
      alert("Erreur lors de l'envoi de l'email.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:1337/api/connect/google";
  };

  return (
    <div className="login-container">
      <button className="back-home-btn" onClick={() => navigate("/")}>
        <FaArrowLeft />
      </button>

      <div className="login-hero" />

      <div className="login-card">
        <h1 className="login-title">Bienvenue</h1>
        <p className="login-subtitle">
          Connectez-vous à votre compte Village de Voyage
        </p>

        {error && <p className="error-banner">{error}</p>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <div className="separator"><span>ou</span></div>

          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            <FcGoogle className="google-icon" />
            Continuer avec Google
          </button>
        </form>

        <p className="signup-text">
          Pas de compte ?{" "}
          <a href="/register" className="link-btn">Inscrivez-vous</a>
        </p>
      </div>

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