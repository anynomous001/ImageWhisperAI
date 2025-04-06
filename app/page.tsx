"use client"

import ImageDisplay from '@/components/imageDisplay';
import ImageUpload from '@/components/imageUpload'
import { useImageUpload } from '@/hooks/useImageUpload';
import React from 'react'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const page = () => {
    const { uploaded } = useSelector((state: RootState) => state.image)

    const {
        handleImageUpload
    }: any = useImageUpload();



    return (
        <main className='flex  bg-sky-950 h-screen w-[100w] items-center justify-center '>
            {
                uploaded ? (
                    <ImageDisplay />
                ) : (
                    <ImageUpload
                        onImageUpload={handleImageUpload}
                    />
                )
            }

        </main>
    )
}

export default page

