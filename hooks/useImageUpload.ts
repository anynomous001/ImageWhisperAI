"use client"

import { ImageTransformAction } from '@/actions/imageTransformAction'
import React from 'react'

export interface UseImageUploadResult {
    error?: string | null,
    success?: boolean | null,
    originalImageUrl?: string | null
    reset: () => void
    handleImageUpload: (file: File) => void
    isLoading: boolean
    uploaded: boolean,
    formdata: FormData
}





export const useImageUpload = (): UseImageUploadResult => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [originalImageUrl, setOriginalImageUrl] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState<boolean>(false)
    const [uploaded, setUploaded] = React.useState<boolean>(false)
    const [formdata, setFormdata] = React.useState<FormData>(new FormData())

    const handleImageUpload = (file: File): void => {
        setUploaded(true)

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
            setOriginalImageUrl(null)


            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async (e: any) => {
                setOriginalImageUrl(e?.target.result)
            }

            formdata.append("image", file)
            setFormdata(formdata)


            setIsLoading(false)

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
        setOriginalImageUrl(null)
        setUploaded(false)
    }

    return {
        handleImageUpload,
        reset,
        isLoading,
        formdata,
        error,
        success,
        originalImageUrl,
        uploaded
    }

}