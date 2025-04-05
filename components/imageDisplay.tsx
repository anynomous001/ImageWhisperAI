import React from 'react'
import { Button } from './ui/button'

interface ImageDisplayProps {
    originalImageUrl: string | null,
    transformedImageUrl: string | null,
    isLoading: boolean,
    error: string | null,
    reset: () => void,
    success: boolean | null,
    uploaded: boolean
}


const ImageDisplay = ({
    originalImageUrl,
    transformedImageUrl,
    isLoading,
    error,
    reset,
    success,
    uploaded
}: ImageDisplayProps) => {

    console.log("originalImageUrl", originalImageUrl)
    console.log("transformedImageUrl", transformedImageUrl)

    return (
        <div className="flex flex-col  w-full h-full">

            <div className='flex space-x-10 justify-center pt-[80px] w-full h-[70%] px-[20px]  '>
                <div className='w-[40%] h-[80%] border-2 border-gray-300 rounded-lg  text-center cursor-pointer mb-8 transition-colors'>
                    {isLoading ? <p>Loading...</p> : error ? <p className='text-red-500'>{error}</p>
                        : originalImageUrl ? <img src={originalImageUrl} alt="Original" className='w-full h-full object-fill' /> : null}

                </div>
                <div className='w-[40%] h-[80%] border-2 border-gray-300 rounded-lg  text-center cursor-pointer mb-8 transition-colors'>
                    {isLoading ? <p>Loading...</p> : error ? <p className='text-red-500'>{error}</p>
                        : transformedImageUrl ? <img src={transformedImageUrl} alt="Original" className='w-full h-full object-fill' /> : null}

                </div>

            </div>
            <div className='flex justify-center items-center space-x-10'>
                <Button variant={"secondary"} size={"lg"} onClick={() => window.open(originalImageUrl || '', '_blank')}>Download Original</Button>
                <Button variant={"secondary"} size={"lg"} onClick={() => window.open(transformedImageUrl || '', '_blank')}>Download Transformed</Button>
                <Button variant={"secondary"} size={"lg"} onClick={reset} >Reset</Button>
            </div>
        </div>
    )
}

export default ImageDisplay