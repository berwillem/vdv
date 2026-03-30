import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Récupère l'emplacement actuel (URL)
  const { pathname } = useLocation();

  useEffect(() => {
    // Remonte en haut de la page dès que le chemin change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ce composant ne rend rien visuellement
};

export default ScrollToTop;