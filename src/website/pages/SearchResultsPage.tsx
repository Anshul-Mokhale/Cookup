import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePost } from "../../context/PostContext";


const SearchResultsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [recipes, setRecipes] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const { searchQuer } = usePost();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get("query") || "";
        setSearchQuery(query);
        if (query) {
            fetchSearchResults(query);
        }
    }, [location.search]);

    const fetchSearchResults = async (query: string) => {
        try {
            const result = await searchQuer(query);
            if (result.status === "success" && result.posts) {
                setRecipes(result.posts);
            } else {
                setError(result.message || "No recipes found");
            }
        } catch (error) {
            setError("Failed to fetch recipes");
        }
    };

    return (
        <div>
            <h1>Search Results for: {searchQuery}</h1>
            {/* Display search results */}
            {recipes.map((recipe) => (
                <div key={recipe._id}>
                    {/* Display recipe details */}
                    <h1>Recipes</h1>
                </div>
            ))}
            {/* Display error if any */}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default SearchResultsPage;
