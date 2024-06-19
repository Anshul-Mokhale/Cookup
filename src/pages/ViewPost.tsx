import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import recipeimg from "../website/assets/recipe (1).jpg";
import { usePost } from "../context/PostContext";

const ViewPost: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Make sure to specify the type for useParams
    const { viewPost } = usePost();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [recipe, setRecipe] = useState<any>(null); // Changed from "recipa" to "recipe"

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) {
                setError("Recipe ID is required.");
                setLoading(false);
                return;
            }
            try {
                const result = await viewPost(id);
                if (result.status === "success") {
                    setRecipe(result.posts);
                } else {
                    setError(result.message || "Failed to fetch recipe.");
                }
            } catch (error: any) {
                setError(error.message || "An error occurred during fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, viewPost]);

    return (
        <DefaultLayout>
            <div>
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                        View Post
                    </h2>
                    <nav>
                        <ol className="flex items-center gap-2">
                            <li>
                                <Link className="font-medium" to="/user/dashboard">
                                    All Posts /
                                </Link>
                            </li>
                            <li>
                                <span className="font-medium">View Post /</span>
                            </li>
                            <li className="font-medium text-primary">{id}</li>
                        </ol>
                    </nav>
                </div>

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">

                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {recipe && (
                            <>
                                <div className="mb-4.5 flex items-center justify-center">
                                    <img src={recipe.recipeImage} alt="demo image" />
                                </div>
                                <h1 className="font-medium text-center text-black font-bold text-4xl dark:text-white mb-4.5">
                                    {recipe.title}
                                </h1>
                                <div className="mb-4 5">
                                    <h3 className="text-black dark:text-white font-bold text-2xl">
                                        Description
                                    </h3>
                                    <p>{recipe.description}</p>
                                </div>
                                <div className="mb-4 5">
                                    <h3 className="text-black dark:text-white font-bold text-2xl">
                                        Ingredients
                                    </h3>
                                    <p>{recipe.ingredients}</p>
                                </div>
                                <div className="mb-4 5">
                                    <h3 className="text-black dark:text-white font-bold text-2xl">
                                        Steps
                                    </h3>
                                    <p>{recipe.steps}</p>
                                </div>
                                <div className="mb-4.5 flex items-center justify-center gap-5">
                                    <Link to={`/user/post/update-image/${id}`} className="border-2 border-webred px-6 py-2 hover:bg-webred text-black dark:text-white">Update Image</Link>
                                    <Link to={`/user/post/update-details/${id}`} className="border-2 border-webred px-6 py-2 hover:bg-webred text-black dark:text-white">Update Details</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ViewPost;
