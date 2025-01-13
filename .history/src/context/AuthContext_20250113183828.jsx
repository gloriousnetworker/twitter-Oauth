import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        accessToken: null,
        accessTokenSecret: null,
        otp: null,
    });

    const login = (accessToken, accessTokenSecret, otp) => {
        setAuthState({
            isAuthenticated: true,
            accessToken,
            accessTokenSecret,
            otp,
        });
    };

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            accessToken: null,
            accessTokenSecret: null,
            otp: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
