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
            <div>
                <h1>Search Results for: {searchQuery}</h1>
                <p>Total Results: {recipes.length}</p>
                {/* Display search results */}
                {recipes.map((recipe) => (
                    <div key={recipe._id}>
                        <img src={recipe.recipeImage} alt={recipe.title} style={{ maxWidth: "200px" }} />
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        {/* Add more details if needed */}
                    </div>
                ))}
                {/* Display error if any */}
                {error && <div>Error: {error}</div>}
            </div>
        </Layout>
    );
};

export default SearchResultsPage;
