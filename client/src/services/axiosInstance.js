import axios from "axios";

const instance = axios.create({
  baseURL: "https://digital-markets.delizioso.my.id/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
