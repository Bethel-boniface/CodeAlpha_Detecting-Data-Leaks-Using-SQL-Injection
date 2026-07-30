import { createContext, useContext, useState } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(
        authService.isAuthenticated()
    );

    const [user, setUser] = useState(
        authService.getUser()
    );

    const login = async (email, password) => {

        const data = await authService.login({
            email,
            password,
        });

        setIsAuthenticated(true);
        setUser(data.user);

        return data;
    };

    const logout = () => {

        authService.logout();

        setIsAuthenticated(false);
        setUser(null);

    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}