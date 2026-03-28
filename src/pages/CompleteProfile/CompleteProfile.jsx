import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CompleteProfile.css";
import { FiPhone, FiUser, FiMail } from "react-icons/fi";

const CompleteProfile = () => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // On récupère l'utilisateur temporaire stocké lors du callback Google
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      navigate("/register"); // Retour si pas d'utilisateur
    } else {
      setUser(savedUser);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const jwt = localStorage.getItem("jwt");

    try {
      // MISE À JOUR DANS STRAPI (Requête PUT sur l'utilisateur actuel)
      const response = await axios.put(
        `http://localhost:1337/api/users/${user.id}`,
        { phone: phone }, // On envoie le champ personnalisé "phone"
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // Mettre à jour l'utilisateur local avec son nouveau numéro
      localStorage.setItem("user", JSON.stringify(response.data));
      
      alert("Profil complété avec succès !");
      navigate("/"); // Direction l'accueil ou le dashboard
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error);
      alert("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="complete-profile-container">
      <div className="complete-card">
        <h2>Dernière étape !</h2>
        <p className="subtitle">
          Ravi de vous voir, <strong>{user.username}</strong>. 
          Ajoutez votre numéro pour finaliser vos réservations.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email (Lecture seule pour rassurer l'user) */}
          <div className="form-group-static">
            <label><FiMail /> Email</label>
            <input type="text" value={user.email} disabled />
          </div>

          {/* Téléphone (Le seul champ à remplir) */}
          <div className="form-group">
            <label><FiPhone /> Numéro de téléphone</label>
            <input
              type="tel"
              placeholder="+213 5XX XX XX XX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Enregistrement..." : "Finaliser mon inscription"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;