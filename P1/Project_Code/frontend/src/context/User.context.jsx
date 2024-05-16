import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    /* User object controlled by state has the following properties
    user.username: Username of the user
    user.email: Email of the user
    user.photo: Link URL of the profile picture of the user
    */

    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export {
    UserContext,
    UserContextProvider
};