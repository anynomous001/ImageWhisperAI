"use client"

import ImageDisplay from '@/components/imageDisplay';
import ImageUpload from '@/components/imageUpload'
import { useImageUpload } from '@/hooks/useImageUpload';
import React from 'react'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Badge } from '@/components/ui/badge';

const page = () => {
    const { uploaded } = useSelector((state: RootState) => state.image)

    const {
        handleImageUpload
    }: any = useImageUpload();

    return (
        <div className="min-h-screen pt-16 w-full bg-black">
            <div className="container w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 pb-6">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-hero-gradient animate-gradient-move">PictureWhisper</h1>
                        <Badge variant="secondary" className="rounded-full">AI</Badge>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Upload an image and get a detailed AI-powered description of what's in it
                    </p>
                </div>            {
                    uploaded ? (
                        <ImageDisplay />
                    ) : (
                        <ImageUpload
                            onImageUpload={handleImageUpload}
                        />
                    )
                }
                <div className="mt-12 text-center text-sm text-muted-foreground">
                    <p>
                        PictureWhisper uses OpenAI's Vision API to generate descriptions of your images.
                        <br />
                        Your images are processed securely and are not stored on our servers.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page

