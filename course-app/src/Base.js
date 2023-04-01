import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './layout/Footer';



function Base() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default Base;