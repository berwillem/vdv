import axios from "axios";

axios.defaults.withCredentials = true;
export const BASE_URL = import.meta.env.VITE_API_LINK;

export const Perso = (formData, userIdentifier, token) => {
  return axios.post(`${BASE_URL}/perso-trips`, 
    {
      data: {
        Destination: formData.Destination,
        nbr: String(formData.nbr),
        budget: Number(formData.budget),
        date: formData.date,
    
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};