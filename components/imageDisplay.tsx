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
    return (
        <div>


        </div>
    )
}

export default ImageDisplay