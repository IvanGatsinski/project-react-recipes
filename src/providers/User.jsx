import React, { useState } from 'react';
import { UserContext } from '../contexts/index';

const UserProvider = (props) => {

    const [user, setUser] = useState(localStorage.getItem('user') || null);

    // const setUserSession = (userProfile) => {
    //     localStorage.setItem('user', userProfile);
    //     setUser(localStorage.getItem('user'))
    // }
    const destroyUserSession = () => {
        localStorage.removeItem('user');
        setUser(null)
    }

    return (
        <UserContext.Provider 
        value={{user, setUser, destroyUserSession}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider;