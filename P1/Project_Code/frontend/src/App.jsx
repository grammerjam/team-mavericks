import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './routes/Home/Home.route';
import Login from './routes/Login/Login.route';
import Register from './routes/Register/Register.route';
import { Layout } from "./components/Layout/Layout.jsx";

// Contexts that contain data needed throughout the whole app
import { BackendURLContextProvider } from './context/BackendURL.context';
import { MoviesContextProvider } from './context/Movies.context.jsx';

function Movies() {
    return (
        <div>
            <h1 style={{color:"white"}} >I am the movies container</h1>
        </div>
    );
}

function TvSeries() {
    return (
        <div>
            <h1 style={{color:"white"}}>I am the tv series container</h1>
        </div>
    );
}

function Bookmarks() {
    return (
        <div>
            <h1 style={{color:"white"}}>I am the bookmark container</h1>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <BackendURLContextProvider>
                <MoviesContextProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home/>} />
                            <Route path="/movies" element={<Movies/>} />
                            <Route path="/tv-series" element={<TvSeries/>} />
                            <Route path="/bookmarks" element={<Bookmarks/>} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </MoviesContextProvider>
            </BackendURLContextProvider>
        </BrowserRouter>
    );
}

export default App;