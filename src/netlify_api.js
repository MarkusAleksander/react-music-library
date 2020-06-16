import axios from "axios";

const instance = axios.create({
    baseURL: "https://netlify-music-app-249862.netlify.app/.netlify/functions",
});

export default instance;
