import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './routes/Home/Home.route';
import Login from './routes/Login/Login.route';
import Register from './routes/Register/Register.route';
import { Layout } from "./components/Layout/Layout.jsx";

// Contexts that contain data needed throughout the whole app
import { UserContextProvider } from './context/User.context.jsx';
import { MoviesContextProvider } from './context/Movies.context.jsx';

import {Movies} from "./routes/Movies/Movies.route.jsx";
import {Bookmarks} from "./routes/Bookmarks/Bookmarks.route.jsx";
import {TvSeries} from "./routes/TvSeries/TvSeries.route.jsx";
import {SearchResults} from "./routes/SearchResults/SearchResults.route.jsx"
import { WatchMedia } from './routes/WatchMedia/WatchMedia.route.jsx';

function App() {
    return (
        <UserContextProvider>
            <MoviesContextProvider>
                <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Home/>} />
                                    <Route path="/movies" element={<Movies/>} />
                                    <Route path="/tv-series" element={<TvSeries/>} />
                                    <Route path="/bookmarks" element={<Bookmarks/>} />
                                    <Route path="/search" element={<SearchResults/>} />
                                    <Route path='/watch/:media_type/:id' element={<WatchMedia/>}/>
                                </Route>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Routes>
                </BrowserRouter>
            </MoviesContextProvider>
        </UserContextProvider>
    );
}

export default App;