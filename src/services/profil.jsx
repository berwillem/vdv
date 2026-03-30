import axios from "axios";

axios.defaults.withCredentials = true;
export const BASE_URL = import.meta.env.VITE_API_LINK;

export const UpdateUserProfile = async (userId, data, jwt) => {
  return await axios.put(`${BASE_URL}/users/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};