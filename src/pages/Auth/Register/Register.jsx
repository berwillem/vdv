import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./Register.css";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      // ÉTAPE 1 : Inscription
      const registerResponse = await axios.post("https://trio-each-helicopter-feeling.trycloudflare.com/api/auth/local/register", {
        username: email.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password: password,
      });

      const { jwt, user } = registerResponse.data;

      // ÉTAPE 2 : Mise à jour du champ 'phone'
      await axios.put(
        `https://trio-each-helicopter-feeling.trycloudflare.com/api/users/${user.id}`,
        { phone: String(phone).trim() },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify({ ...user, phone }));

      alert(t("register.success"));
      navigate("/"); 
    } catch (err) {
      const strapiError = err.response?.data?.error?.message;
      // Traduction spécifique pour l'email déjà pris
      if (strapiError === "Email or Username are already taken") {
        setError(t("register.errors.email_taken"));
      } else {
        setError(t("register.errors.generic"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://trio-each-helicopter-feeling.trycloudflare.com/api/connect/google";
  };

  return (
    <div className="register-container">
      <button className="back-home-btn" onClick={() => navigate("/")}>
        <FaArrowLeft />
      </button>

      <div className="register-hero" />

      <div className="register-card">
        <h1 className="register-title">{t("register.title")}</h1>
        <p className="register-subtitle">{t("register.subtitle")}</p>

        {error && <div className="error-banner">{error}</div>}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("register.fields.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("register.fields.placeholders.email")}
              required
            />
          </div>

          <div className="form-group">
            <label>{t("register.fields.phone")}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("register.fields.placeholders.phone")}
              required
            />
          </div>

          <div className="form-group">
            <label>{t("register.fields.password")}</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label>{t("register.fields.confirm_password")}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="••••••••"
              required
              className={!passwordMatch ? "input-error" : ""}
            />
            {!passwordMatch && (
              <p className="field-error">{t("register.errors.match")}</p>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? t("register.buttons.loading") : t("register.buttons.submit")}
          </button>

          <div className="separator"><span>{t("register.separator")}</span></div>

          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            <FcGoogle className="google-icon" />
            {t("register.buttons.google")}
          </button>
        </form>

        <p className="login-text">
          {t("register.footer.text")} <Link to="/signin" className="link-btn">{t("register.footer.link")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;