"use client"

import ImageDisplay from '@/components/imageDisplay';
import ImageUpload from '@/components/imageUpload'
import { useImageUpload } from '@/hooks/useImageUpload';
import React from 'react'

const page = () => {

    const {
        handleImageUpload,
        reset,
        isLoading,
        error,
        success,
        originalImageUrl,
        uploaded,
        formdata
    }: any = useImageUpload();



    return (
        <main className='flex  bg-sky-950 h-screen w-[100w] items-center justify-center '>
            {
                uploaded ? (
                    <ImageDisplay
                        originalImageUrl={originalImageUrl}
                        transformedImageUrl={""}
                        isLoading={isLoading}
                        error={error}
                        reset={reset}
                        success={success}
                        uploaded={uploaded}
                    />
                ) : (
                    <ImageUpload
                        onImageUpload={handleImageUpload}
                        formdata={formdata}
                        reset={reset}
                    />
                )
            }

        </main>
    )
}

export default page

