import React, { useState, useEffect, createContext } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    /* User object controlled by state has the following properties
    user.username: Username of the user
    user.email: Email of the user
    user.photo: Link URL of the profile picture of the user
    */

    /** Encode user obj to JSON string to store in sessionStorage
     * Decode JSON user string to grab user obj
     */

    const [user, setUser] = useState(() => {
        
        const userFromSessionStorage = sessionStorage.getItem("user");

        if (userFromSessionStorage)
        {
            return JSON.parse(userFromSessionStorage);
        }

        else
        {
            return null;
        }
    });

    const logoutUser = () => setUser(null);

    const signUser = (userData) => setUser(userData);

    // Ignore Cookies for now
    // Just use sessionStorage to store the user there
    useEffect(() => {
        if (user)
        {
            sessionStorage.setItem("user", JSON.stringify(user));
        }

        else
        {
            sessionStorage.removeItem("user");
        }
    }, [user]);

    return (
        <UserContext.Provider value={{user, signUser, logoutUser}}>
            {children}
        </UserContext.Provider>
    );
};

export {
    UserContext,
    UserContextProvider
};