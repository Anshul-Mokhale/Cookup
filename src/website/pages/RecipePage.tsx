import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../../context/PostContext";
import Layout from "../Layout";

const RecipePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { viewPost } = usePost();
    const [recipe, setRecipe] = useState<any>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) {
                setError("Recipe ID is required.");
                // setLoading(false);
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
                // setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, viewPost]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!recipe) {
        return <div>No recipe found.</div>;
    }

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
                        <h1 className="text-black dark:text-white font-bold text-2xl mb-2">Description</h1>
                        <p className="mb-4">{formatText(recipe.description)}</p>
                        <h1 className="text-black dark:text-white font-bold text-2xl mb-2">Ingredients</h1>
                        <p className="mb-4">{formatText(recipe.ingredient)}</p>
                        <h1 className="text-black dark:text-white font-bold text-2xl mb-2">Steps</h1>
                        <p className="mb-4">{formatText(recipe.steps)}</p>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default RecipePage;
