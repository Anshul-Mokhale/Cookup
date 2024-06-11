import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);
    return (
        // footer section 
        <footer className="px-7 py-4 bg-white dark:bg-boxdark text-boxdark-2 dark:text-white">
            <div className="flex flex-col items-start justify-between pb-2 md:flex-row">
                <div className="footer-1 w-full md:w-3/5">
                    <div className="flex items-center">
                        <img className="w-20" src={logo} alt="cookup logo" />
                        <h1 className="text-xl font-bold">Cookup</h1>
                    </div>
                    <div>
                        <p className="pr-2">Recipe Sharing Platform. Discover, share, and savor the joy of cooking with our community. Whether you're a seasoned chef or a home cook, our platform is the perfect place to find and share recipes, tips, and culinary inspiration. Join us today and start your culinary adventure!</p>
                    </div>
                </div>
                <div className="footer-2 list-none">
                    <h4 className="text-xl font-bold my-4">Links</h4>
                    <li><Link to='/' className="hover:text-webred">Home</Link></li>
                    <li><Link to='/' className="hover:text-webred">About</Link></li>
                    <li><Link to='/' className="hover:text-webred">Recipes</Link></li>
                </div>
            </div>
            <div className="pt-2 border-t-2 border-slate-300">
                <p className="text-center">All rights reserved to <a className="text-webred" href="https://anshul-mokhale.netlify.app" target="_blank">Anshul Mokhale</a> &copy; {currentYear}</p>
            </div>

        </footer>
    )
}

export default Footer;