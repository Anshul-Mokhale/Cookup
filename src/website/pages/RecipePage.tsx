import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../../context/PostContext";
import Layout from "../Layout";
import Loader from "../../common/Loader";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "../../context/UserContext";

const RecipePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { viewPost } = usePost();
    const { getUser } = useUser();
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<any>(null);

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

    useEffect(() => {
        const fetchUsername = async () => {
            if (recipe && recipe.userId) {
                try {
                    const newResult = await getUser(recipe.userId);

                    setUsername(newResult.name);
                } catch (error: any) {
                    setError(error.message || "An error occurred during fetching user data.");
                }
            }
        };

        fetchUsername();
    }, [recipe, getUser]);

    if (loading) {
        return <div><Loader /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // if (!recipe) {
    //     return <div>No recipe found.</div>;
    // }

    // Function to convert newline characters to <br> tags
    const formatText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <>
            <Layout>
                <div className="dark:bg-boxdark-2 p-6">
                    <div className="bg-white text-black dark:text-white dark:bg-boxdark p-4">
                        <div className="flex flex-row items-center justify-between">
                            <img src={recipe.recipeImage} alt={recipe.title} />
                            <h1 className="text-center font-bold text-4xl">{recipe.title}</h1>
                        </div>
                        <div className="flex flex-row items-center justify-between py-2">
                            <h1>Posted By: {username}</h1>
                            <p>Date: {new Date(recipe.createdAt).toLocaleDateString()}</p>
                            {/* <button><FontAwesomeIcon icon={faBookmark} />&nbsp; Save</button> */}
                        </div>
                        <div className="py-4">
                            <h1 className="text-black dark:text-white font-bold text-2xl mb-2">Description</h1>
                            <p className="mb-4">{formatText(recipe.description)}</p>
                            <h1 className="text-black dark:text-white font-bold text-2xl mb-2">Ingredients</h1>
                            <p className="mb-4">{formatText(recipe.ingredient)}</p>
                            <h1 className="text-black dark:text-white font-bold text-2xl mb-2">Steps</h1>
                            <p className="mb-4">{formatText(recipe.steps)}</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default RecipePage;
