import React from "react";
import Layout from "../Layout";
import "../css/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import recipe1 from "../assets/recipe (1).jpg";
import recipe2 from "../assets/recipe (2).jpg";
import recipe3 from "../assets/recipe (3).jpg";
import recipe4 from "../assets/recipe (4).jpg";
import recipe5 from "../assets/recipe (5).jpg";
import recipe10 from "../assets/recipe (10).jpg";
import recipe7 from "../assets/recipe (7).jpg";
import recipe8 from "../assets/recipe (8).jpg";
import adver from "../assets/cooking ad.svg";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <Layout>
            {/* home section start */}
            <div className="Home dark:bg-boxdark-2 dark:text-white">
                {/* home 1 section  */}
                <div className="Home-1 flex flex-col items-center justify-center gap-3">
                    <h1 className="text-white text-center text-4xl font-bold">Cookup</h1>
                    <p className="text-white text-center">Discover, create, and share delicious recipes with ease!</p>
                    <div>
                        <div className="bg-white dark:bg-boxdark dark:text-white px-4 py-2 rounded-2xl">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            &nbsp;&nbsp;
                            <input className="w-50 h-8 md:w-96 bg-transparent focus:border-none focus:outline-none" type="text" placeholder="Search Recipe" />
                            <button className="bg-webred px-2 rounded-xl text-white">search</button>
                        </div>
                    </div>
                </div>
                {/* Home section 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-6 py-2">
                    <div className="h-auto p-4 bg-white dark:bg-boxdark">
                        <span className="text-4xl font-bold">100+</span>
                        <h2>Recipes</h2>
                    </div>
                    <div className="h-auto p-4 bg-white dark:bg-boxdark">
                        <span className="text-4xl font-bold">50+</span>
                        <h2>Users</h2>
                    </div>
                    <div className="h-auto p-4 bg-white dark:bg-boxdark">
                        <span className="text-4xl font-bold">10+</span>
                        <h2>Categories</h2>
                    </div>
                </div>
                {/* Home section 3 */}
                <div className="Home-3 px-6 py-2">
                    <h1 className="text-3xl font-bold text-center">Recipes</h1>
                    <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                        <div className="h-full p-4 bg-white dark:bg-boxdark">
                            <Link to="#">
                                <img src={recipe1} alt="Butter Chicken" className="w-full h-auto object-cover" style={{ aspectRatio: "5/4" }} />
                                <h4 className="text-center font-bold mt-2">Butter Chicken (Murgh Makhani)</h4>
                            </Link>
                        </div>
                        <div className="h-full p-4 bg-white dark:bg-boxdark">
                            <Link to="#">
                                <img src={recipe10} alt="Masala Dosa" className="w-full h-auto object-cover" style={{ aspectRatio: "5/4" }} />
                                <h4 className="text-center font-bold mt-2">Masala Dosa</h4>
                            </Link>
                        </div>

                        <div className="h-full p-4 bg-white dark:bg-boxdark">
                            <Link to="#">
                                <img src={recipe5} alt="Palak Paneer" className="w-full h-auto object-cover" style={{ aspectRatio: "5/4" }} />
                                <h4 className="text-center font-bold mt-2">Palak Paneer</h4>
                            </Link>

                        </div>
                        <div className="h-full p-4 bg-white dark:bg-boxdark">
                            <Link to="#">
                                <img src={recipe3} alt="Chole (Chickpea Curry)" className="w-full h-auto object-cover" style={{ aspectRatio: "5/4" }} />
                                <h4 className="text-center font-bold mt-2">Chole (Chickpea Curry)</h4>
                            </Link>
                        </div>

                        <div className="h-full p-4 bg-white dark:bg-boxdark">
                            <Link to="#">
                                <img src={recipe4} alt="chicken Biryani " className="w-full h-auto object-cover" style={{ aspectRatio: "5/4" }} />
                                <h4 className="text-center font-bold mt-2">Chicken Biryani </h4>
                            </Link>

                        </div>
                        <div className="h-full p-4 bg-white dark:bg-boxdark">
                            <Link to="#">
                                <img src={recipe2} alt="Rogan Josh" className="w-full h-auto object-cover" style={{ aspectRatio: "5/4" }} />
                                <h4 className="text-center font-bold mt-2">Rogan Josh</h4>
                            </Link>

                        </div>

                        <div className="h-full p-4 bg-white dark:bg-boxdark">
                            <Link to="#">
                                <img src={recipe8} alt="Samosa" className="w-full h-auto object-cover" style={{ aspectRatio: "5/4" }} />
                                <h4 className="text-center font-bold mt-2">Samosa</h4>
                            </Link>

                        </div>
                        <div className="h-full p-4 bg-white dark:bg-boxdark">
                            <Link to="#">
                                <img src={recipe7} alt="Tandoori Chicken" className="w-full h-auto object-cover" style={{ aspectRatio: "5/4" }} />
                                <h4 className="text-center font-bold mt-2">Tandoori Chicken</h4>
                            </Link>

                        </div>
                    </div>
                    <div className="flex items-center justify-center my-4">
                        <Link to="/" className="border-2 border-webred px-4 py-2 hover:bg-webred">See More</Link>
                    </div>
                </div>
                {/* Home section 4 */}
                <div className="Home-4 p-6">
                    <div className="flex flex-col items-center justify-between bg-white md:flex-row dark:bg-boxdark p-6">
                        <div>
                            <img src={adver} alt="module image" className="w-full md:w-96" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold">Share Your Culinary Creations!</h1>
                            <p>Got a great recipe? Click "Post" to share it with our community! Let's inspire each other with delicious dishes and creative cooking ideas.</p>
                            <div className="mt-6">
                                <Link to="#" className="border-2 border-webred px-6 py-2 hover:bg-webred"><FontAwesomeIcon icon={faPlus} />  Post</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout >
    )
}

export default Home;