import axios from "axios";
import { api_url } from "./URLs";

instance = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  },
});
