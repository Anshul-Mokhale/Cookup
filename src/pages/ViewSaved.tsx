import React from "react";
import { Link, useParams } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import recipeimg from "../website/assets/recipe (1).jpg"

const ViewSaved: React.FC = () => {
    const { id } = useParams();
    return (
        <DefaultLayout>
            <>
                {/* breadcrumb */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                        View Saved Post
                    </h2>

                    <nav>
                        <ol className="flex items-center gap-2">
                            <li>
                                <Link className="font-medium" to="/user/dashboard">
                                    All Posts /
                                </Link>
                            </li>
                            <li>
                                <Link className="font-medium" to="#">
                                    View Saved Post /
                                </Link>
                            </li>
                            <li className="font-medium text-primary">{id}</li>
                        </ol>
                    </nav>
                </div>
                {/* breadcrumb */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <div className="mb-4.5 flex items-center justify-center">
                            <img src={recipeimg} alt="demo image" />
                        </div>
                        <h1 className="font-medium text-center text-black font-bold text-4xl dark:text-white mb-4.5">
                            {id}
                        </h1>
                        <div className="mb-4 5">
                            <h3 className="text-black dark:text-white font-bold text-2xl">
                                Description
                            </h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aut delectus, excepturi sapiente temporibus similique error quam dolores architecto sequi eum amet veritatis distinctio in laborum praesentium? Accusantium ab recusandae molestiae ducimus facilis quo sed doloremque, alias saepe praesentium vel voluptatum perferendis aperiam laboriosam possimus voluptates cupiditate. Quia, necessitatibus aut.</p>
                        </div>
                        <div className="mb-4 5">
                            <h3 className="text-black dark:text-white font-bold text-2xl">
                                Ingredients
                            </h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aut delectus, excepturi sapiente temporibus similique error quam dolores architecto sequi eum amet veritatis distinctio in laborum praesentium? Accusantium ab recusandae molestiae ducimus facilis quo sed doloremque, alias saepe praesentium vel voluptatum perferendis aperiam laboriosam possimus voluptates cupiditate. Quia, necessitatibus aut.</p>
                        </div>
                        <div className="mb-4 5">
                            <h3 className="text-black dark:text-white font-bold text-2xl">
                                Steps
                            </h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aut delectus, excepturi sapiente temporibus similique error quam dolores architecto sequi eum amet veritatis distinctio in laborum praesentium? Accusantium ab recusandae molestiae ducimus facilis quo sed doloremque, alias saepe praesentium vel voluptatum perferendis aperiam laboriosam possimus voluptates cupiditate. Quia, necessitatibus aut.</p>
                        </div>

                    </div>

                </div>
            </>
        </DefaultLayout>
    );
};


export default ViewSaved;