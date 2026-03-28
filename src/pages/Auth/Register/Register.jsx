import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./Register.css";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    setLoading(true);

    try {
      // ÉTAPE 1 : Inscription avec les champs standards uniquement
      const registerResponse = await axios.post("http://localhost:1337/api/auth/local/register", {
        username: email.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password: password,
      });

      const { jwt, user } = registerResponse.data;

      // ÉTAPE 2 : Mise à jour du champ 'phone' immédiatement après
      // On utilise le JWT tout juste reçu pour s'autoriser la modif
      await axios.put(
        `http://localhost:1337/api/users/${user.id}`,
        { phone: String(phone).trim() },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // Sauvegarde finale des infos complètes
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify({ ...user, phone }));

      alert("Inscription réussie !");
      navigate("/"); 
    } catch (err) {
      console.error("Détails erreur Strapi:", err.response?.data?.error);
      const message = err.response?.data?.error?.message;
      setError(message || "Une erreur est survenue lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:1337/api/connect/google";
  };

  return (
    <div className="register-container">
      <button className="back-home-btn" onClick={() => navigate("/")}>
        <FaArrowLeft />
      </button>

      <div className="register-hero" />

      <div className="register-card">
        <h1 className="register-title">Créer un compte</h1>
        <p className="register-subtitle">
          Rejoignez Village de Voyage et réservez vos rêves
        </p>

        {error && <div className="error-banner">{error}</div>}

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
              type="tel" // Garde le clavier numérique mais envoie du texte
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0755555555"
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
              className={!passwordMatch ? "input-error" : ""}
            />
            {!passwordMatch && (
              <p className="field-error">Les mots de passe ne correspondent pas</p>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Création en cours..." : "S'inscrire"}
          </button>

          <div className="separator"><span>ou</span></div>

          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            <FcGoogle className="google-icon" />
            Continuer avec Google
          </button>
        </form>

        <p className="login-text">
          Déjà un compte ? <a href="/signin" className="link-btn">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Register;