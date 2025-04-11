import React from 'react'
import ButtonComponent from './button/buttonComponent'
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { resetImageState } from '@/redux/actions/imageActions'
import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

// interface ImageDisplayProps {
//     originalImageUrl: string | null,
//     transformedImageUrl: string | null,
//     isLoading: boolean,
//     error: string | null,
//     success: boolean | null,
//     uploaded: boolean
// }




const ImageDisplay = () => {

    const dispatch = useDispatch()

    const {
        isAnalysis,
        isUploading,
        uploadError,
        analysisError,
        originalImageUrl,
        analyzedImageText,
        uploadSuccess,
        analysisSuccess,
        uploaded,
    } = useSelector((state: RootState) => state.image);

    console.log("originalImageUrl : ", originalImageUrl)
    console.log("transformedImageUrl : ", analyzedImageText)

    return (
        <div className="flex flex-col  w-full h-full">

            <div className='flex space-x-10 justify-center pt-[80px] w-full h-[70%] px-[20px]  '>
                <div className='w-[40%] h-[80%] border-2 border-gray-300 rounded-lg  text-center cursor-pointer mb-8 transition-colors'>
                    {isUploading ? <p>Loading...</p> : uploadError ? <p className='text-red-500'>{uploadError}</p>
                        : originalImageUrl ? <img src={originalImageUrl} alt="Original" className='w-full h-full object-fill' /> : null}

                </div>
                <div className='w-[40%] h-[80%] border-2 border-gray-300 rounded-lg  text-center cursor-pointer mb-8 transition-colors'>
                    {isAnalysis ? <p>Loading...</p> : analysisError ? <p className='text-red-500'>{analysisError}</p>
                        : analyzedImageText ?
                            <div className="p-6 h-full flex flex-col">
                                <h3 className="text-xl font-medium mb-3">Image Analysis</h3>

                                {isAnalysis ? (
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-8 w-8 border-4 border-primary border-r-transparent rounded-full animate-spin" />
                                            <p className="text-muted-foreground">Analyzing image...</p>
                                        </div>
                                    </div>
                                ) : analysisError ? (
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="text-center text-destructive">
                                            <p className="mb-2">{analysisError}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="">
                                        <div className="prose prose-slate dark:prose-invert max-w-none">
                                            <p className="text-lg leading-relaxed whitespace-pre-line">
                                                {analyzedImageText}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => dispatch(resetImageState())} className="gap-2">
                                        <RefreshCw size={16} />
                                        Try another image
                                    </Button>
                                </div>
                            </div>

                            : null}

                </div>

            </div>
            <ButtonComponent />
        </div>
    )
}

export default ImageDisplay