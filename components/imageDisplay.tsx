import React from 'react'

interface ImageDisplayProps {
    originalImageUrl: string | null,
    transformedImageUrl: string | null,
    isLoading: boolean,
    error: string | null,
    reset: () => void,
    success: boolean | null,
}


const ImageDisplay = ({
    originalImageUrl,
    transformedImageUrl,
    isLoading,
    error,
    reset,
    success,
}: ImageDisplayProps) => {

    console.log("originalImageUrl", originalImageUrl)
    console.log("transformedImageUrl", transformedImageUrl)

    return (
        <div className='flex justify-between '>
            <div className='w-[200px] h-[200px]'>
                {isLoading ? <p>Loading...</p> : error ? <p className='text-red-500'>{error}</p>
                    : originalImageUrl ? <img src={originalImageUrl} alt="Original" className='w-full h-full object-cover' /> : null}

            </div>
            <div className='w-[200px] h-[200px]'>
                {isLoading ? <p>Loading...</p> : error ? <p className='text-red-500'>{error}</p>
                    : transformedImageUrl ? <img src={transformedImageUrl} alt="Original" className='w-full h-full object-cover' /> : null}

            </div>

        </div>
    )
}

export default ImageDisplay