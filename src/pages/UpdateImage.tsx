import React, { useState, useRef } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

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

const UpdateImage: React.FC = () => {
    const { id } = useParams();

    const [imageSrc, setImageSrc] = useState<string>('');
    const [croppedImage, setCroppedImage] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    return (
        <DefaultLayout>
            <>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Update Recipe Image
                        </h3>
                    </div>
                    <form action="#">
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-3 block text-black dark:text-white">
                                    Choose Image
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
                        </div>
                        <div className="p-6.5">
                            <button className="flex w-full items-center justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Upload
                            </button>
                        </div>
                    </form>
                    <ImageCropperPopup imageSrc={imageSrc} onCrop={handleCrop} onClose={handleClose} />
                </div>
            </>
        </DefaultLayout>
    );
}

export default UpdateImage;