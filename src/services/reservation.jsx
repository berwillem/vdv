import axios from "axios";

axios.defaults.withCredentials = true;
export const BASE_URL = import.meta.env.VITE_API_LINK;

export const CreateReservation = async (payload, token) => {
  return await axios.post(`${BASE_URL}/reservations`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};