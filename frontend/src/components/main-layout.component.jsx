import React from 'react';
// 1. Remove Outlet from this file
import Navbar from './navbar.component';
import Footer from './footer.component';

const MainLayout = () => {
    return (
        <>
            <Navbar />
          
            <Footer />
        </>
    );
};

export default MainLayout;