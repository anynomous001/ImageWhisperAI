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
        transformedImageUrl,
        originalImageUrl
    }: any = useImageUpload();



    return (
        <main className='bg-sky-950 h-screen w-[100w] flex justify-center items-center'>
            <ImageUpload onImageUpload={handleImageUpload} />
            <ImageDisplay
                originalImageUrl={originalImageUrl}
                transformedImageUrl={transformedImageUrl}
                isLoading={isLoading}
                error={error}
                reset={reset}
                success={success}
            />
        </main>
    )
}

export default page

