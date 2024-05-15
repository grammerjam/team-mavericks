import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Route Components
import Home from './routes/Home/Home.route';
import Login from './routes/Login/Login.route';
import Register from './routes/Register/Register.route';
import { Layout } from "./components/Layout/Layout.jsx";

function Movies() {
    return (
        <div>
            <h1>I am the movies container</h1>
        </div>
    );
}

function TvSeries() {
    return (
        <div>
            <h1>I am the tv series container</h1>
        </div>
    );
}

function Bookmarks() {
    return (
        <div>
            <h1>I am the bookmark container</h1>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
