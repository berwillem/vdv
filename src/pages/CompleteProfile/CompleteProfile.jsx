import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert

import "./CompleteProfile.css";
import { FiPhone, FiMail } from "react-icons/fi";
import { UpdateUserProfile } from "../../services/profil";

const CompleteProfile = () => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    
    // Petite validation avant l'envoi
    if (phone.length < 8) {
      return Swal.fire({
        icon: "warning",
        title: "Numéro invalide",
        text: "Veuillez entrer un numéro de téléphone valide.",
        confirmButtonColor: "#1a1c3d",
      });
    }

    setLoading(true);
    const jwt = localStorage.getItem("jwt");

    try {
      // Appel au service
      const response = await UpdateUserProfile(user.id, { phone: phone }, jwt);

      // Mise à jour du stockage local avec les nouvelles données (incluant le téléphone)
      localStorage.setItem("user", JSON.stringify(response.data));

      // Alerte de succès
      await Swal.fire({
        icon: "success",
        title: "Profil complété !",
        text: `Bienvenue parmi nous, ${user.username}.`,
        confirmButtonColor: "#1a1c3d",
        timer: 2500,
        showConfirmButton: false
      });

      navigate("/"); 
      
    } catch (error) {
      console.error("Erreur mise à jour profil:", error);
      
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible d'enregistrer vos informations. Veuillez réessayer.",
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
        <h2>Dernière étape !</h2>
        <p className="subtitle">
          Ravi de vous voir, <strong>{user.username}</strong>. 
          Ajoutez votre numéro pour finaliser vos réservations.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group-static">
            <label><FiMail /> Email</label>
            <input type="text" value={user.email} disabled />
          </div>

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