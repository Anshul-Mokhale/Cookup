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

        const userData = localStorage.getItem('user');
        const parsedUser = userData ? JSON.parse(userData) : null;
        const token = parsedUser.token;

        try {
            const response = await fetch(`https://cookup-backend.onrender.com/api/v1/recipe/view-recipe`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
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

        try {
            const response = await fetch(`https://cookup-backend.onrender.com/api/v1/recipe/delete-post`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${parsedUser.token}`, // Use token from parsed user
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, recipeId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { status: 'error', message: errorData.message || 'An error occurred during deletion' };
            }

            const data = await response.json();
            return { status: 'success', message: data.message || 'Post deleted successfully' };
        } catch (error: any) {
            return { status: 'error', message: error.message || 'An error occurred during deletion' };
        }
    };




    return (
        <PostContext.Provider value={{ createPost, getAllPost, viewPost, viewAllPostedRecipes, deletePost }}>
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
