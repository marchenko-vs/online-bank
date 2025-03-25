import { createContext, useState, useEffect, useContext, FC } from 'react';

export type AuthContextType = {
    isLoggedIn: boolean | undefined;
    setIsLoggedIn: any;
}

type AuthContextProviderType ={
    children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('jwt') != null);

    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>
}
