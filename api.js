import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const customAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    // You can add other common headers here
  },
});

export default customAxios;
