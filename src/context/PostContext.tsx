import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface Post {
    _id: number;
    name: string;
}

interface PostContextType {
    createPost: (recipeImage: File, title: string, description: string, ingredient: string, steps: string, category: string) => Promise<{ status: string, message?: string, name?: string }>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const createPost = async (recipeImage: File, title: string, description: string, ingredient: string, steps: string, category: string): Promise<{ status: string, message?: string, name?: string }> => {
        try {
            const formData = new FormData();
            formData.append('recipeImage', recipeImage);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('ingredient', ingredient);
            formData.append('steps', steps);
            formData.append('category', category);

            console.log(formData);

            const response = await fetch('https://cookup-backend.onrender.com/api/v1/recipe/create-post', {
                method: 'POST',
                body: formData,
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
            console.log(response);
            const data = await response.json();

            if (data.success === true) {
                console.log(data);
                return data;
            } else {
                console.log(data.message);
                return data;
            }

        } catch (error: any) {
            console.log(error);
            return { status: 'error', message: error.message || 'An error occurred during creating post' };
        }
    };

    return (
        <PostContext.Provider value={{ createPost }}>
            {children}
        </PostContext.Provider>
    );
}

export const usePost = (): PostContextType => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};
