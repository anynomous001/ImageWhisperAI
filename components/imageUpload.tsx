'use client';

import { useState } from 'react';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function ImageUpload({ onImageUpload }: { onImageUpload: (file: File) => void }) {
    const {
        isUploading,
    } = useSelector((state: RootState) => state.image)

    const [isDragActive, setIsDragActive] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setIsDragActive(false);
        if (acceptedFiles && acceptedFiles.length > 0) {
            onImageUpload(acceptedFiles[0]);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxFiles: 1,
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
    });

    return (
        <div className='w-full flex flex-col items-center justify-center'>

            <div className='w-[50%] py-4 flex flex-col items-center justify-center  border-2 border-solid  border-slate-400/30  rounded-lg'>

                <div
                    {...getRootProps()}
                    className={cn(
                        'w-[90%]  image-upload-area flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-bold border-gray-400 hover:border-[#905BF6] rounded-lg p-8 m-4 hover:cursor-pointer  hover:bg-slate-200/10 ',
                        isDragActive && 'drag-active border-primary',
                        isDragReject && 'border-destructive',

                    )}
                >
                    <input {...getInputProps()} disabled={isUploading} />

                    <div className="mb-4 p-3 rounded-full bg-primary/20">
                        {isUploading ? (
                            <div className="animate-spin">
                                <Upload size={24} className="text-white text-primary" />
                            </div>
                        ) : (
                            <ImageIcon size={60} className=" p-3 rounded-full bg-slate-100 bg-opacity-20 hover:bg-opacity-35 text-[#905BF6]" />
                        )}
                    </div>

                    <h3 className="text-xl text-white font-medium mb-2 hover:bg-clip-text hover:text-transparent hover:bg-hero-gradient hover:animate-gradient-move">Upload an image</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                        Drag and drop your image here, or click to browse
                    </p>

                    {isDragReject && (
                        <p className="text-destructive mb-4">
                            This file type is not supported. Please use JPG, PNG, GIF, or WebP.
                        </p>
                    )}

                    <Button
                        variant="secondary"
                        disabled={isUploading}
                        className="relative overflow-hidden"
                    >
                        <span className={isUploading ? 'opacity-0' : 'opacity-100'}>
                            Select Image
                        </span>
                        {isUploading && (
                            <span className="absolute inset-0 flex items-center justify-center">
                                <div className="h-5 w-5 border-2 border-primary border-r-transparent rounded-full animate-spin" />
                            </span>
                        )}
                    </Button>
                </div>
            </div>

        </div>
    );
}