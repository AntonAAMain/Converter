import axios from "axios";

export const apiBase = axios.create({
  baseURL: "https://v6.exchangerate-api.com/v6/a0dffa79d4712805c4881495/",
});
