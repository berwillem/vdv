import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import Swal from "sweetalert2";

import "./CompleteProfile.css";
import { FiPhone, FiMail } from "react-icons/fi";
import { UpdateUserProfile } from "../../services/profil";

const CompleteProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      navigate("/register");
    } else {
      setUser(savedUser);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation minimale
    if (phone.length < 8) {
      return Swal.fire({
        icon: "warning",
        title: t("complete.alerts.invalid_title"),
        text: t("complete.alerts.invalid_text"),
        confirmButtonColor: "#1a1c3d",
      });
    }

    setLoading(true);
    const jwt = localStorage.getItem("jwt");

    try {
      const response = await UpdateUserProfile(user.id, { phone: phone }, jwt);

      localStorage.setItem("user", JSON.stringify(response.data));

      await Swal.fire({
        icon: "success",
        title: t("complete.alerts.success_title"),
        text: t("complete.alerts.success_text", { name: user.username }),
        confirmButtonColor: "#1a1c3d",
        timer: 2500,
        showConfirmButton: false
      });

      navigate("/"); 
      
    } catch (error) {
      console.error("Erreur mise à jour profil:", error);
      Swal.fire({
        icon: "error",
        title: t("complete.alerts.error_title"),
        text: t("complete.alerts.error_text"),
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="complete-profile-container">
      <div className="complete-card">
        <div className="profile-icon-header">
           <FiPhone size={40} color="#1a1c3d" />
        </div>
        <h2>{t("complete.title")}</h2>
        
        {/* Utilisation de Trans pour permettre le <strong> dans la traduction */}
        <p className="subtitle">
          <Trans i18nKey="complete.subtitle" values={{ name: user.username }}>
            Ravi de vous voir, <strong>{{name: user.username}}</strong>. Ajoutez votre numéro pour finaliser vos réservations.
          </Trans>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group-static">
            <label><FiMail /> {t("complete.fields.email")}</label>
            <input type="text" value={user.email} disabled />
          </div>

          <div className="form-group">
            <label><FiPhone /> {t("complete.fields.phone")}</label>
            <input
              type="tel"
              placeholder={t("complete.fields.phone_placeholder")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? t("complete.buttons.loading") : t("complete.buttons.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;