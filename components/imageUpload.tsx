'use client';
import { useState, useRef } from 'react';
import { Button } from './ui/button';
import ButtonComponent from './button/buttonComponent';

export default function ImageUpload({ onImageUpload, formdata, reset }: { onImageUpload: (file: File) => void, formdata: FormData, reset: () => void }) {
    // This component allows users to upload an image by dragging and dropping it or by clicking to select a file.
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onImageUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            onImageUpload(e.target.files[0]);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            // Trigger the file input click event to open the file dialog
            (fileInputRef.current as HTMLInputElement).click();
        }
    }


    return (
        <div className="text-center flex flex-col items-center">

            <div
                className={`flex  justify-center items-center  w-[400px] h-[300px] border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-8 transition-colors
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleButtonClick}
            >
                <div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    <div className="flex flex-col items-center justify-center">
                        <svg
                            className="w-12 h-12 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>

                        <p className="text-lg font-medium">
                            {isDragging ? 'Drop your image here' : 'Drag & drop your image here or click to browse'}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Supports: JPG, PNG, WEBP (max 10MB)
                        </p>
                    </div>
                </div>
            </div>
            <ButtonComponent formdata={formdata} reset={reset} />
        </div>

    );
}