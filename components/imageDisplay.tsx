import React from 'react'
import ButtonComponent from './button/buttonComponent'
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { resetImageState } from '@/redux/actions/imageActions'
import { RefreshCw, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { useImageUpload } from '@/hooks/useImageUpload';

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


    const { reset } = useImageUpload()

    const handleCopyText = async () => {
        if (analyzedImageText) {
            await navigator.clipboard.writeText(analyzedImageText);
        }
    };

    console.log("originalImageUrl : ", originalImageUrl)
    console.log("transformedImageUrl : ", analyzedImageText)
    console.log("analysisSuccess : ", analysisSuccess)

    return (
        <div className="flex flex-col  w-full h-full">

            <div className='flex flex-col items-center space-x-10 justify-center pt-[40px] w-full'>
                <div className='w-[90%] max-w-[900px] aspect-[4/3] border-2 border-gray-300 rounded-lg text-center cursor-pointer mb-8 transition-colors'>
                    {isUploading ? <p>Loading...</p> : uploadError ? <p className='text-red-500'>{uploadError}</p>
                        : originalImageUrl ? <img src={originalImageUrl} alt="Original" className='w-full h-full object-contain' /> : null}
                </div>

                <div className='w-[90%] max-w-[900px] flex ml-0 flex-col border-2 border-gray-300 rounded-lg text-center p-6 mb-8 transition-colors min-h-[200px]'>
                    <h3 className="text-2xl text-left  text-white font-semibold mb-6 text-primary">Image Analysis</h3>

                    {isAnalysis ? (
                        <div className="flex-1 flex items-center justify-center h-[200px]">
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-8 w-8 border-4 border-primary border-r-transparent rounded-full animate-spin" />
                                <p className="text-muted-foreground">Analyzing image...</p>
                            </div>
                        </div>
                    ) : analysisError ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <div className="text-center text-destructive">
                                <p className="mb-2">{analysisError}</p>
                            </div>
                        </div>
                    ) : true ? (
                        <div className="p-8">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-2xl leading-relaxed whitespace-pre-line text-slate-300 dark:text-slate-200">
                                    {analyzedImageText}
                                    {/* Imagine a picture-perfect scene where history and spirituality collide like two old friends sharing a chai. On the banks of the Ganges, vibrant buildings play hide-and-seek with the clouds, while little boats bob along as if they’re swaying to an unseen rhythm.
                                    These ancient temples are like the city’s gossiping grandmas, whispering tales of devotion and pilgrimage, while the colorful architecture shouts, "Look at me!" in a delightful chaos of hues. The air is heavy with incense and a hint of mischief, as if the city itself is winking at visitors.
                                    The sky stretches above in a soft palette of blues and yellows, a gentle reminder that even in the hustle of life, there's beauty to be found. The scene invites you to drop your worries like they’re hot potatoes and immerse yourself in the delightful chaos that is Varanasi, where every corner holds a story, and every moment is steeped in magic. */}
                                </p>
                            </div>
                        </div>
                    ) : null}
                    <div className="pt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={handleCopyText} className="gap-2">
                            <Copy size={16} />
                            Copy Text
                        </Button>
                        <Button variant="outline" onClick={reset} className="gap-2">
                            <RefreshCw size={16} />
                            Try another image
                        </Button>
                    </div>
                </div>

            </div>

            {!analysisSuccess && <ButtonComponent />}
        </div>
    )
}

export default ImageDisplay