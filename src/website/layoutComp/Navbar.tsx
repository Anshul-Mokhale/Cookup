import React, { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="sticky top-0 w-full  z-99999 bg-white dark:bg-boxdark text-boxdark-2 dark:text-white shadow-md transition-all duration-300">
            <div className="flex items-center justify-between py-2 px-6">
                <div className="flex items-center">
                    <img className="w-15" src={logo} alt="site logo" />
                    <h1 className="text-xl font-bold ml-2">Cookup</h1>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-boxdark-2 dark:text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <NavLink to="/" className="text-boxdark-2 dark:text-white hover:text-webred">
                        Home
                    </NavLink>
                    <NavLink to="/about" className="text-boxdark-2 dark:text-white hover:text-webred">
                        About
                    </NavLink>
                    <NavLink to="/recipes" className="text-boxdark-2 dark:text-white hover:text-webred">
                        Recipes
                    </NavLink>

                </div>


                {parsedUser ? (
                    <div className="hidden md:flex items-center space-x-2">
                        <NavLink to="/user/dashboard" className="text-boxdark-2 dark:text-white border-2 border-boxdark-2 dark:border-white py-1 px-3 rounded-md hover:border-webred hover:bg-webred">
                            {parsedUser.name}
                        </NavLink>
                    </div>
                ) : (<div className="hidden md:flex items-center space-x-2">
                    <NavLink to="/user/sign-in" className="text-boxdark-2 dark:text-white border-2 border-boxdark-2 dark:border-white py-1 px-3 rounded-md hover:border-webred hover:bg-webred">
                        Login
                    </NavLink>
                    <NavLink to="/user/sign-up" className="text-boxdark-2 dark:text-white border-2 border-boxdark-2 dark:border-white py-1 px-3 rounded-md hover:border-webred hover:bg-webred">
                        Signup
                    </NavLink>
                </div>)}

            </div>
            <div
                className={`${isOpen ? 'max-h-screen pb-4' : 'max-h-0'
                    } overflow-hidden absolute w-full transition-all duration-300 ease-in-out md:hidden bg-white dark:bg-boxdark px-6 pt-0`}
            >
                <NavLink to="/" className="block py-2 text-boxdark-2 dark:text-white hover:text-webred">
                    Home
                </NavLink>
                <NavLink to="/about" className="block py-2 text-boxdark-2 dark:text-white hover:text-webred">
                    About
                </NavLink>
                <NavLink to="/recipes" className="block py-2 text-boxdark-2 dark:text-white hover:text-webred">
                    Recipes
                </NavLink>
                {parsedUser ? (<NavLink to="/user/sign-in" className="block  text-boxdark-2 dark:text-white border-2 border-boxdark-2 dark:border-white mb-2 py-1 px-3 rounded-md hover:border-webred hover:bg-webred">
                    {parsedUser.name}
                </NavLink>) : (<div> <NavLink to="/user/sign-in" className="block  text-boxdark-2 dark:text-white border-2 border-boxdark-2 dark:border-white mb-2 py-1 px-3 rounded-md hover:border-webred hover:bg-webred">
                    Login
                </NavLink>
                    <NavLink to="/user/sign-up" className="block  text-boxdark-2 dark:text-white border-2 border-boxdark-2 dark:border-white py-1 px-3 rounded-md hover:border-webred hover:bg-webred">
                        Signup
                    </NavLink>
                </div>)}


            </div>
        </nav>
    );
};

export default Navbar;
