"use client"

import { ImageTransformAction } from '@/actions/imageTransformAction'
import React from 'react'

export interface UseImageUploadResult {
    error?: string | null,
    success?: boolean | null,
    transformedImageUrl?: string | null
    originalImageUrl?: string | null
    reset: () => void
    handleImageUpload: (file: File) => Promise<void>
    isLoading: boolean
}





export const useImageUpload = (): Promise<UseImageUploadResult> => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [transformedImageUrl, setTransformedImageUrl] = React.useState<string | null>(null)
    const [originalImageUrl, setOriginalImageUrl] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState<boolean>(false)

    const handleImageUpload = async (file: File): Promise<void> => {

        if (!file) {
            setError("Please upload a valid image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError("File size exceeds the limit of 5MB.");
            return;
        }

        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            setError("Please upload a valid image file format (jpg, jpeg, png, gif).");
            return;
        }


        try {
            setIsLoading(true)
            setError(null)
            setSuccess(false)
            setTransformedImageUrl(null)
            setOriginalImageUrl(null)


            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async (e: any) => {
                setOriginalImageUrl(e?.target.result)
            }

            const formdata = new FormData()
            formdata.append("image", file)


            const response = await ImageTransformAction(formdata)
            setIsLoading(false)
            console.log(response)
            if (response.success && response.transformedImageUrl) {
                setTransformedImageUrl(response.transformedImageUrl);
            } else {
                setError(response.error || "Failed to transform image");
            }
            setSuccess(response.success)

        } catch (error) {

            setIsLoading(false)
            setError("An error occurred while uploading the image");
            console.error(error);

        }
    }

    const reset = () => {
        setIsLoading(false)
        setError(null)
        setSuccess(false)
        setTransformedImageUrl(null)
        setOriginalImageUrl(null)
    }

    return {
        //@ts-ignore
        handleImageUpload,
        reset,
        isLoading,
        error,
        success,
        transformedImageUrl,
        originalImageUrl
    }

}