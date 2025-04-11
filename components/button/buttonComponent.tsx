"use client"

import React from 'react'
import { Button } from '../ui/button'
import {
    analysisImageRequest,
    analysisImageSuccess,
    analysisImageFailure,
    resetImageState,
} from '@/redux/actions/imageActions'
import { ImageTransformAction } from '@/actions/imageTransformAction'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'


const ButtonComponent = () => {

    const dispatch = useDispatch()
    const {
        uploaded,
        isUploading,
        isAnalysis,
        analysisError,
        analysisSuccess,
        originalImageUrl,
        analyzedImageText,
        formdata
    } = useSelector((state: RootState) => state.image)

    const ghibliHandler = () => {
        dispatch(analysisImageRequest())

        ImageTransformAction(formdata, originalImageUrl)
            .then((response) => {
                console.log(response)
                if (response.success && response.analyzedImageText) {
                    dispatch(analysisImageSuccess(response.analyzedImageText))
                } else {
                    dispatch(analysisImageFailure(response.error || "An error occurred while processing the image."))
                }
            })
            .catch((error) => {
                dispatch(analysisImageFailure("An error occurred while processing the image"))
                console.error(error)
            })

    }

    return (
        <div>
            {
                analysisSuccess ? (
                    <div className='flex justify-center items-center space-x-10'>
                        <Button variant={"secondary"} size={"lg"} onClick={() => window.open(analyzedImageText || '', '_blank')}>{`${analyzedImageText ? 'Processing...' : 'Download Transformed'}`}</Button>
                        <Button variant={"secondary"} size={"lg"} onClick={() => dispatch(resetImageState())} >Reset</Button>
                    </div>
                ) : (
                    <div className="flex justify-center items-center space-x-10">
                        <Button variant={"outline"} size={"lg"} onClick={ghibliHandler} disabled={!uploaded}  >{`${isAnalysis ? 'Processing...' : 'Ghilbify'}`}</Button>
                        <Button variant={"outline"} size={"lg"} disabled={!uploaded} >Calify</Button>
                    </div>

                )

            }

        </div>
    )
}

export default ButtonComponent