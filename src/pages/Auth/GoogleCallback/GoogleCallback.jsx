import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Extraire l'access_token envoyé par Google dans l'URL
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      // 2. Appeler Strapi pour valider ce token
      // C'est cet appel qui crée le compte dans Strapi s'il est nouveau
      axios
        .get(`http://localhost:1337/api/auth/google/callback?access_token=${accessToken}`)
        .then((res) => {
          // Strapi renvoie : { jwt: "...", user: {...} }
          const { jwt, user } = res.data;

          // 3. Sauvegarder les infos
          localStorage.setItem("jwt", jwt);
          localStorage.setItem("user", JSON.stringify(user));

          // 4. Logique de redirection
          // Si l'utilisateur n'a pas de téléphone (nouveau compte Google), 
          // on peut le rediriger vers une page pour compléter son profil
          if (!user.phone) {
            navigate("/complete-profile"); 
          } else {
            navigate("/"); // Retour à l'accueil
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la liaison avec Strapi:", err);
          navigate("/signin");
        });
    } else {
      console.error("Aucun access_token trouvé");
      navigate("/signin");
    }
  }, [location, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
      <div className="loader"></div> {/* Tu peux ajouter un spinner CSS ici */}
      <h2>Vérification de votre compte...</h2>
      <p>Nous finalisons votre connexion avec Google.</p>
    </div>
  );
};

export default GoogleCallback;