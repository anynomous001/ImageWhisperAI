"use client"

import React from 'react'
import { Button } from '../ui/button'
import {
    analysisImageRequest,
    analysisImageSuccess,
    analysisImageFailure,
} from '@/redux/actions/imageActions'
import { ImageTransformAction } from '@/actions/imageTransformAction'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useImageUpload } from '@/hooks/useImageUpload'

const ButtonComponent = () => {
    const dispatch = useDispatch()
    const {
        uploaded,
        isAnalysis,
        analysisSuccess,
        originalImageUrl,
    } = useSelector((state: RootState) => state.image)

    const { getCurrentFormData } = useImageUpload();

    const ghibliHandler = () => {
        dispatch(analysisImageRequest())

        const formdata = getCurrentFormData();

        if (!formdata || !originalImageUrl) {
            dispatch(analysisImageFailure("No image data available"));
            return;
        }

        ImageTransformAction(formdata, originalImageUrl)
            .then((response) => {
                console.log(response)
                if (response.success && response.analyzedImageText) {
                    console.log(isAnalysis, analysisSuccess)
                    dispatch(analysisImageSuccess(response.analyzedImageText))
                    console.log(isAnalysis, analysisSuccess)
                } else {
                    dispatch(analysisImageFailure(response.error || "No worries! Just need to refresh my token to get back on track."))
                }
            })
            .catch((error) => {
                dispatch(analysisImageFailure("An error occurred while processing the image"))
                console.error(error)
            })

    }

    return (
        <div>
            <div className="flex justify-center items-center space-x-10">
                <Button
                    variant={"outline"}
                    size={"lg"}
                    onClick={ghibliHandler}
                    disabled={!uploaded}
                >
                    {isAnalysis ? 'Processing...' : 'Analysis'}
                </Button>
            </div>
        </div>
    )
}

export default ButtonComponent