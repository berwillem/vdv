import axios from "axios";

axios.defaults.withCredentials = true;
export const BASE_URL = import.meta.env.VITE_API_LINK;


// On ajoute ?populate=* pour récupérer images, catégories et disponibilités
export const GetVoyage = () => axios.get(`${BASE_URL}/voyages?populate=*`);

// Note : Pour un ID, on utilise généralement .get et non .post
// Force le peuplement spécifique des catégories et de l'image
export const GetVoyageById = (id) => {
  // On construit l'URL avec les noms EXACTS de ta capture d'écran
  const url = `${BASE_URL}/voyages/${id}?populate[0]=image&populate[1]=categories&populate[2]=disponibilite`;
  return axios.get(url);
};