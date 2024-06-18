import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../../context/PostContext";

const RecipePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { viewPost } = usePost();
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!recipe) {
        return <div>No recipe found.</div>;
    }

    return (
        <>
            <h1>{recipe.title}</h1>
            <img src={recipe.recipeImage} alt={recipe.title} />
            <p>{recipe.description}</p>
            <h2>Ingredients</h2>
            <p>{recipe.ingredient}</p>
            <h2>Steps</h2>
            <p>{recipe.steps}</p>
            <p>Category: {recipe.category}</p>
            <p>Created At: {new Date(recipe.createdAt).toLocaleDateString()}</p>
            <p>Updated At: {new Date(recipe.updatedAt).toLocaleDateString()}</p>
        </>
    );
};

export default RecipePage;
