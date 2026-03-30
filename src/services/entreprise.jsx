import axios from "axios";

axios.defaults.withCredentials = true;
export const BASE_URL = import.meta.env.VITE_API_LINK;

export const PostContactEntreprise = async (formData) => {
  const payload = {
    data: {
      nom: formData.nom,
      prenom: formData.prenom,
      nom_entreprise: formData.entreprise,
      domaine_activite: formData.domaine,
      email: formData.email,
      telephone: formData.telephone,
      date_evenement: formData.dateEvenement,
      nombre_jours: parseInt(formData.nombreJours),
      
      // CONVERSION ICI : transforme "oui" en true et "non" en false
      transport_bus: formData.transportBus === "oui", 
      
      details: formData.details,
    }
  };

  return await axios.post(`${BASE_URL}/contact-entreprises`, payload);
};