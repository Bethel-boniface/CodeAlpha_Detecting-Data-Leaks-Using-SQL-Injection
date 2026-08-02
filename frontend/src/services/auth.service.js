import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

const TOKEN_KEY = "token";
const USER_KEY = "user";

const authService = {

    async register(userData) {
        const response = await API.post("/auth/register", userData);
        return response.data;
    },

    async login(credentials) {
        const response = await API.post("/auth/login", credentials);

        if (response.data.token) {
            localStorage.setItem(TOKEN_KEY, response.data.token);
            localStorage.setItem(
                USER_KEY,
                JSON.stringify(response.data.user)
            );
        }

        return response.data;
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    getUser() {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        return !!localStorage.getItem(TOKEN_KEY);
    }

};

export default authService;