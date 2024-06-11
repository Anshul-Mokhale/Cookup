import React, { ReactNode } from 'react';
import Navbar from './layoutComp/Navbar';
import Footer from './layoutComp/Footer';



const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
