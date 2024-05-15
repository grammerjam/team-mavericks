import React from 'react';
import {Outlet} from 'react-router-dom';
import {NavigationBar} from "../Navigation/NavigationBar.jsx";
import {SearchBar} from "../Search/SearchBar.jsx";

export const Layout = () => {
    return (
        <>
        <NavigationBar></NavigationBar>
        <SearchBar></SearchBar>
            <Outlet></Outlet>
        </>
    );
}