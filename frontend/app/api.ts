import axios from "axios";

const BASE_API = axios.create({
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});

export const createApiInstance = (baseURL: string) => {
  const instance = axios.create({
    ...BASE_API.defaults,
    baseURL,
  });

  return instance;
};
