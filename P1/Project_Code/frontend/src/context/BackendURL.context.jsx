import React, { createContext } from "react";

const BackendURLContext = createContext();

const BackendURLContextProvider = ({ children }) => {
    const backendURL = "http://localhost:8000";

    return (
        <BackendURLContext.Provider value={backendURL}>
            {children}
        </BackendURLContext.Provider>
    );
};

export {
    BackendURLContext,
    BackendURLContextProvider
};