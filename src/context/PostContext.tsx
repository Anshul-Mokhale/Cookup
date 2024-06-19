import React, { createContext, useContext, ReactNode } from 'react';

// Define the Post interface
interface Post {
    _id: string;
    recipeImage: string;
    title: string;
    description: string;
    ingredient: string;
    steps: string;
    userId: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

// Define the context type
interface PostContextType {
    createPost: (
        recipeImage: File,
        title: string,
        description: string,
        ingredient: string,
        steps: string,
        category: string
    ) => Promise<{ status: string, message?: string, name?: string }>;
    getAllPost: () => Promise<{ status: string, message?: string, posts?: Post[] }>;
    viewPost: (recipeId: string) => Promise<{ status: string; message?: string; posts?: Post[] }>;
    viewAllPostedRecipes: () => Promise<{ status: string; message?: string; posts?: Post[] }>;
    deletePost: (recipeId: string) => Promise<{ status: string, message?: string, name?: string }>;
    searchQuer: (query: string) => Promise<{ status: string; message?: string; posts?: Post[] }>;
    udpatePostImage: (image: File, recipeId: string) => Promise<{ status: string, message?: string, name?: string }>;
    updatePostDetails: (recipeId: string,
        title: string,
        description: string,
        ingredient: string,
        steps: string) => Promise<{ status: string, message?: string, name?: string }>;
}

// Create the PostContext
const PostContext = createContext<PostContextType | undefined>(undefined);

// PostProvider component
export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Function to create a post
    const createPost = async (
        recipeImage: File,
        title: string,
        description: string,
        ingredient: string,
        steps: string,
        category: string
    ): Promise<{ status: string, message?: string, name?: string }> => {
        const user = localStorage.getItem('user');
        const parsedUser = user ? JSON.parse(user) : null;

        try {
            const formData = new FormData();
            formData.append('recipeImage', recipeImage);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('ingredient', ingredient);
            formData.append('steps', steps);
            formData.append('category', category);
            formData.append('userId', parsedUser._id);

            const response = await fetch('https://cookup-backend.onrender.com/api/v1/recipe/create-post', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            return data.success ? data : { status: 'error', message: data.message };

        } catch (error: any) {
            return { status: 'error', message: error.message || 'An error occurred during creating post' };
        }
    };

    // Function to get all posts
    const getAllPost = async (): Promise<{ status: string, message?: string, posts?: Post[] }> => {
        try {
            const response = await fetch('https://cookup-backend.onrender.com/api/v1/recipe/get-all-recipes', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            return data.success ? { status: 'success', posts: data.data } : { status: 'error', message: data.message };

        } catch (error: any) {
            return { status: 'error', message: error.message || 'An error occurred while fetching posts' };
        }
    }

    const viewPost = async (recipeId: string): Promise<{ status: string, message?: string, posts?: Post[] }> => {

        // const userData = localStorage.getItem('user');
        // const parsedUser = userData ? JSON.parse(userData) : null;
        // const token = parsedUser.token;

        try {
            const response = await fetch(`https://cookup-backend.onrender.com/api/v1/recipe/view-recipe`, {
                method: 'POST',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipeId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { status: 'error', message: errorData.message || 'An error occurred during fetching data' };
            }

            const data = await response.json();
            return { status: 'success', posts: data.data };
        } catch (error: any) {
            return { status: 'error', message: error.message || 'An error occurred during fetching data' };
        }
    };

    const viewAllPostedRecipes = async (): Promise<{ status: string, message?: string, posts?: Post[] }> => {
        const userData = localStorage.getItem('user');
        const parsedUser = userData ? JSON.parse(userData) : null;
        const token = parsedUser?._id;

        try {
            const response = await fetch(`https://cookup-backend.onrender.com/api/v1/recipe/get-user-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: token }) // Sending userId instead of token
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { status: 'error', message: errorData.message || 'An error occurred during fetching data' };
            }

            const data = await response.json();
            return { status: 'success', posts: data.data };
        } catch (error: any) {
            return { status: 'error', message: error.message || 'An error occurred during fetching data' };
        }
    };

    const deletePost = async (recipeId: string): Promise<{ status: string, message?: string, name?: string }> => {
        const userData = localStorage.getItem('user');
        const parsedUser = userData ? JSON.parse(userData) : null;
        const userId = parsedUser ? parsedUser._id : null;
        const token = parsedUser ? parsedUser.token : null; // Get token from parsed user

        try {
            const response = await fetch(`https://cookup-backend.onrender.com/api/v1/recipe/delete-recipe`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Use token from parsed user
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, recipeId })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred during deletion');
            }

            return { status: 'success', message: 'Post deleted successfully' };
        } catch (error: any) {
            return { status: 'error', message: error.message || 'An error occurred during deletion' };
        }
    };

    const searchQuer = async (query: string): Promise<{ status: string, message?: string, posts?: Post[] }> => {
        try {
            const response = await fetch(`https://cookup-backend.onrender.com/api/v1/recipe/search-recipes?query=${encodeURIComponent(query)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            return {
                status: 'success',
                posts: data.recipes // Assuming the response contains an array of recipes under the key 'recipes'
            };
        } catch (error: any) {
            return {
                status: 'error',
                message: error.message
            };
        }
    };

    const udpatePostImage = async (image: File, recipeId: string): Promise<{ status: string, message?: string, name?: string }> => {
        const user = localStorage.getItem('user');
        const parsedUser = user ? JSON.parse(user) : null;
        const token = parsedUser.token;

        try {
            const formData = new FormData();
            formData.append('updatedImage', image);
            formData.append('recipe_id', recipeId);

            const response = await fetch('https://cookup-backend.onrender.com/api/v1/recipe/update-image', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return {
                status: 'success',
                name: data.name, // Assuming the response contains the name of the updated image
            };

        }
        catch (error: any) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }

    const updatePostDetails = async (recipeId: string, title: string,
        description: string,
        ingredient: string,
        steps: string,): Promise<{ status: string, message?: string, name?: string }> => {
        const userData = localStorage.getItem('user');
        const parsedUser = userData ? JSON.parse(userData) : null;
        const token = parsedUser ? parsedUser.token : null; // Get token from parsed user

        const recipe_id = recipeId;

        try {
            const response = await fetch(`https://cookup-backend.onrender.com/api/v1/recipe/update-details`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Use token from parsed user
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, ingredient, steps, recipe_id })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred during deletion');
            }

            return { status: 'success', message: 'Post updated successfully' };
        } catch (error: any) {
            return { status: 'error', message: error.message || 'An error occurred during updateinon' };
        }
    };



    return (
        <PostContext.Provider value={{ createPost, getAllPost, viewPost, viewAllPostedRecipes, deletePost, searchQuer, udpatePostImage, updatePostDetails }}>
            {children}
        </PostContext.Provider>
    );
}

// Custom hook to use the PostContext
export const usePost = (): PostContextType => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};
