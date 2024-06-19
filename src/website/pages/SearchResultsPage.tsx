import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePost } from "../../context/PostContext";
import Layout from "../Layout";

const SearchResultsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [recipes, setRecipes] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const { searchQuer: searchRecipes } = usePost();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get("query") || "";
        setSearchQuery(query);
        if (query) {
            fetchSearchResults(query);
        }
    }, [location.search]);

    const fetchSearchResults = async (query: string) => {
        try {
            const result = await searchRecipes(query);
            if (result.status === "success" && result.posts) {
                setRecipes(result.posts);
                setError(null);
            } else {
                setError(result.message || "No recipes found");
            }
        } catch (error) {
            setError("Failed to fetch recipes");
        }
    };

    return (
        <Layout>
            <div className="p-8 dark:bg-boxdark-2">
                <h1 className="text-black dark:text-white font-bold text-2xl">Search Results for: {searchQuery}</h1>
                <p className=" mt-2">Total Results: {recipes.length}</p>
                {/* Display search results */}
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="mt-6 flex items-center">
                        <img src={recipe.recipeImage} alt={recipe.title} className="w-32 h-32 mr-4 rounded-lg" />
                        <div>
                            <h2 className="text-lg font-semibold text-black dark:text-white">{recipe.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{recipe.description}</p>
                            {/* Add more details if needed */}
                        </div>
                    </div>
                ))}
                {/* Display error if any */}
                {error && <div className="mt-6 text-red-500">{error}</div>}
            </div>
        </Layout>
    );
};

export default SearchResultsPage;
