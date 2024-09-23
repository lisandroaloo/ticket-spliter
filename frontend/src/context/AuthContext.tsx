import React, { createContext, useContext, useState } from 'react'
import { AuthContextType, IAuthContextProviderProps } from '../../interfaces';

const defaultAuthContext: AuthContextType = {
    authUser: null,
    setAuthUser: () => { },
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }: IAuthContextProviderProps) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("app-user")!) || null);

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
}

