import React, { useState } from 'react';
import { AuthContext } from '../contexts/index';

const AuthProvider = (props) => {

    const [authtoken, setAuthtoken] = useState(localStorage.getItem('authtoken'));
    const [isAuth, setAuth] = useState(authtoken);

    const setToken = (token) => {
        localStorage.setItem('authtoken', token);
        setAuth(true)
        setAuthtoken(token)
    }
    const destroyToken = () => {
        localStorage.removeItem('authtoken');
        setAuth(false)
        setAuthtoken(null)
    }

    return (
        <AuthContext.Provider 
        value={{
            isAuth,
            authtoken, 
            setToken, 
            destroyToken,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;