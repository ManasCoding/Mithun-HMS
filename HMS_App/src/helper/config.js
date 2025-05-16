import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7002/api",
});

export default instance;
