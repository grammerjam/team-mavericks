import React, { useState, createContext } from "react";
import movies from "../movies.json"; // Represents all movies in the DB

const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
    // Change filtered movies
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredCategory, setFilteredCategory] = useState([]);

    return (
        <MoviesContext.Provider 
            value={
                {
                    movies, 
                    filteredMovies, 
                    setFilteredMovies, 
                    filteredCategory, 
                    setFilteredCategory,
                    loading,
                    setLoading
                }
            }
        >
            {children}
        </MoviesContext.Provider>
    );
};

export {
    MoviesContext,
    MoviesContextProvider
};