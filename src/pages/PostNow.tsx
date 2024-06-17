import React, { useState, useRef } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { usePost } from "../context/PostContext";

Modal.setAppElement('#root');

const ImageCropperPopup: React.FC<{ imageSrc: string, onCrop: (croppedImage: string) => void, onClose: () => void }> = ({ imageSrc, onCrop, onClose }) => {
    const [cropper, setCropper] = useState<Cropper | null>(null);

    const handleAfterOpenModal = () => {
        if (imageSrc && !cropper) {
            const newCropper = new Cropper(document.getElementById('cropper-image') as HTMLImageElement, {
                aspectRatio: 1,
                viewMode: 1,
                dragMode: 'move',
                background: false,
                cropBoxResizable: false,
                cropBoxMovable: false,
                ready: function () {
                    const cropperInstance = this.cropper;
                    cropperInstance.setCropBoxData({ width: 270, height: 270 });
                }
            });
            setCropper(newCropper);
        }
    };

    const handleCrop = () => {
        if (cropper) {
            const canvas = cropper.getCroppedCanvas({
                width: 270,
                height: 270
            });
            if (canvas) {
                const dataUrl = canvas.toDataURL();
                onCrop(dataUrl);
            }
            cropper.destroy();
            setCropper(null);
        }
        onClose();
    };

    const handleClose = () => {
        if (cropper) {
            cropper.destroy();
            setCropper(null);
        }
        onClose();
    };

    return (
        <Modal
            isOpen={!!imageSrc}
            onRequestClose={handleClose}
            onAfterOpen={handleAfterOpenModal}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)',
                    width: '400px', // Adjusted to fit the crop box
                    height: '400px', // Adjusted to fit the crop box
                    padding: '0',
                    overflow: 'hidden',
                }
            }}
        >
            <div style={{ width: '100%', height: '85%', position: 'relative' }}>
                <img
                    id="cropper-image"
                    src={imageSrc}
                    alt="Selected"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            </div>
            <div style={{ width: '100%', height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button onClick={handleClose} style={{ marginRight: '10px' }}>Close</button>
                <button onClick={handleCrop}>Crop</button>
            </div>
        </Modal>
    );
};

const PostNow: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string>('');
    const [croppedImage, setCroppedImage] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredient, setIngredient] = useState<string>('');
    const [steps, setSteps] = useState<string>('');
    const [category, setCategory] = useState<string>(''); // You might want to add category options
    const [errorMessage, setErrorMessage] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [msg, setMsg] = useState<string>('');
    const { createPost } = usePost();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImageSrc(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const dataURLtoFile = (dataurl: string, filename: string) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleCrop = (croppedImage: string) => {
        setCroppedImage(croppedImage);

        const croppedFile = dataURLtoFile(croppedImage, 'cropped-image.png');
        if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(croppedFile);
            fileInputRef.current.files = dataTransfer.files;
        }

        setImageSrc('');
    };

    const handleClose = () => {
        setImageSrc('');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!fileInputRef.current?.files?.[0] || !title || !description || !ingredient || !steps || !category) {
            setErrorMessage("All fields are required.");
            return;
        }

        const recipeImage = fileInputRef.current.files[0];

        const response = await createPost(recipeImage, title, description, ingredient, steps, category);

        if (response.status === "error") {
            setErrorMessage(response.message || "An error occurred during creating post.");
        } else {
            // handle successful post creation (e.g., redirect to the posts list, reset the form, etc.)
            console.log("Post created successfully:", response);
            setMsg('Post created successfully');
        }
    };

    return (
        <DefaultLayout>
            <>
                {/* Breadcrumb */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                        Post Now
                    </h2>

                    <nav>
                        <ol className="flex items-center gap-2">
                            <li>
                                <Link className="font-medium" to="/user/dashboard">
                                    All Posts /
                                </Link>
                            </li>
                            <li className="font-medium text-primary">Post Now</li>
                        </ol>
                    </nav>
                </div>
                {/* post form */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Create New Post
                        </h3>
                    </div>

                    {msg ? (
                        <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                            <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                                <svg
                                    width="16"
                                    height="12"
                                    viewBox="0 0 16 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                                        fill="white"
                                        stroke="white"
                                    ></path>
                                </svg>
                            </div>
                            <div className="w-full">
                                <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                                    {msg}
                                </h5>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-3 block text-black dark:text-white">
                                    Choose Recipe Image
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    accept="image/*"
                                />
                            </div>
                            {croppedImage && (
                                <div className="mb-4.5">
                                    <h2 className="text-black dark:text-white">Selected Image</h2>
                                    <img src={croppedImage} alt="Cropped" />
                                </div>
                            )}
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
                                    required
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
                                    placeholder="Enter Here Description"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
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
                                    required
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
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Category <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Enter category of recipe"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>
                            {errorMessage && (
                                <div className="mb-4.5 text-meta-1">
                                    {errorMessage}
                                </div>
                            )}
                            <button type="submit" className="flex w-full items-center justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                <FontAwesomeIcon icon={faPaperPlane} /> &nbsp; Post
                            </button>
                        </div>
                    </form>
                </div>
                <ImageCropperPopup imageSrc={imageSrc} onCrop={handleCrop} onClose={handleClose} />
            </>
        </DefaultLayout>
    );
};

export default PostNow;
