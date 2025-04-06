import React from 'react'
import ButtonComponent from './button/buttonComponent'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

// interface ImageDisplayProps {
//     originalImageUrl: string | null,
//     transformedImageUrl: string | null,
//     isLoading: boolean,
//     error: string | null,
//     success: boolean | null,
//     uploaded: boolean
// }




const ImageDisplay = () => {

    const {
        isTransforming,
        isUploading,
        uploadError,
        transformError,
        originalImageUrl,
        transformedImageUrl,
        uploadSuccess,
        transformSuccess,
        uploaded
    } = useSelector((state: RootState) => state.image);

    console.log("originalImageUrl : ", originalImageUrl)
    console.log("transformedImageUrl : ", transformedImageUrl)

    return (
        <div className="flex flex-col  w-full h-full">

            <div className='flex space-x-10 justify-center pt-[80px] w-full h-[70%] px-[20px]  '>
                <div className='w-[40%] h-[80%] border-2 border-gray-300 rounded-lg  text-center cursor-pointer mb-8 transition-colors'>
                    {isUploading ? <p>Loading...</p> : uploadError ? <p className='text-red-500'>{uploadError}</p>
                        : originalImageUrl ? <img src={originalImageUrl} alt="Original" className='w-full h-full object-fill' /> : null}

                </div>
                <div className='w-[40%] h-[80%] border-2 border-gray-300 rounded-lg  text-center cursor-pointer mb-8 transition-colors'>
                    {isTransforming ? <p>Loading...</p> : transformError ? <p className='text-red-500'>{transformError}</p>
                        : transformedImageUrl ? <img src={transformedImageUrl} alt="Original" className='w-full h-full object-fill' /> : null}

                </div>

            </div>
            <ButtonComponent />
        </div>
    )
}

export default ImageDisplay