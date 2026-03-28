import axios from "axios";

axios.defaults.withCredentials = true;
export const BASE_URL = import.meta.env.VITE_API_LINK;



export const PostContactB2C = (data) => axios.post(`${BASE_URL}/contacts`, { data });
export const PostContactB2B = (data) => axios.post(`${BASE_URL}/contactb2bs`, { data });