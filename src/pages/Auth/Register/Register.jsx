// src/pages/Auth/Register/Register.jsx
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true); // true = no error

  // Check password match on change
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === password || value === "");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordMatch(value === confirmPassword || confirmPassword === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    // Here you can add real registration logic
    alert("Inscription réussie ! (simulation)");
  };

  return (
    <div className="register-container">
      <button
        className="back-home-btn"
        onClick={() => (window.location.href = "/")}
      >
        <FaArrowLeft />
      </button>
      {/* Background Hero */}
      <div className="register-hero" />

      {/* Register Card */}
      <div className="register-card">
        <h1 className="register-title">Créer un compte</h1>
        <p className="register-subtitle">
          Rejoignez Village de Voyage et réservez vos rêves
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+213 ..."
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="••••••••"
              required
            />
            {!passwordMatch && (
              <p className="error-message">
                Les mots de passe ne correspondent pas
              </p>
            )}
          </div>

          <button type="submit" className="submit-btn">
            S'inscrire
          </button>
        </form>

        <p className="login-text">
          Déjà un compte ?{" "}
          <a href="/signin" className="link-btn">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
