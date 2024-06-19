import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { usePost } from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDetails: React.FC = () => {
    const { id } = useParams();
    const { updatePostDetails } = usePost();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredient, setIngredient] = useState<string>('');
    const [steps, setSteps] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log("prepared the request for sending to backend");

        const recipeId = id || "";

        const response = await updatePostDetails(recipeId, title, description, ingredient, steps);

        if (response.status === "error") {
            setErrorMessage(response.message || "An error occurred during creating post.");
            console.log(errorMessage);
        } else {
            // handle successful post creation (e.g., redirect to the posts list, reset the form, etc.)
            // console.log("Post created successfully:", response);
            // localStorage.setItem('action', 'success');
            navigate('/user/dashboard');
        }
    };
    return (
        <DefaultLayout>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Update Post Details
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Title <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title of recipe"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-black dark:text-white">
                                Description <span className="text-meta-1">*</span>
                            </label>
                            <textarea
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter Here Descripiton"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-black dark:text-white">
                                Ingredients <span className="text-meta-1">*</span>
                            </label>
                            <textarea
                                rows={6}
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                placeholder="Enter Here ingredients"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

                            ></textarea>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-black dark:text-white">
                                Steps <span className="text-meta-1">*</span>
                            </label>
                            <textarea
                                rows={6}
                                value={steps}
                                onChange={(e) => setSteps(e.target.value)}
                                placeholder="Enter here steps"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

                            ></textarea>
                        </div>

                        <button className="flex w-full items-center justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
}

export default UpdateDetails;