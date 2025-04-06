"use client"

import React from 'react'
import { Button } from '../ui/button'
import {
    transformImageRequest,
    transformImageSuccess,
    transformImageFailure,
    resetImageState,
} from '@/redux/actions/imageActions'
import { ImageTransformAction } from '@/actions/imageTransformAction'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'


const ButtonComponent = () => {

    const [isTransformed, setIsTransformed] = React.useState(false)
    const dispatch = useDispatch()
    const {
        isTransforming,
        transformError,
        transformSuccess,
        transformedImageUrl,
        formdata
    } = useSelector((state: RootState) => state.image)

    const ghibliHandler = () => {
        setIsTransformed(true)
        if (formdata) {
            dispatch(transformImageRequest())

            ImageTransformAction(formdata)
                .then((response) => {
                    if (response.success && response.transformedImageUrl) {
                        dispatch(transformImageSuccess(response.transformedImageUrl))
                    } else {
                        dispatch(transformImageFailure(response.error || "An error occurred while processing the image."))
                    }
                })
                .catch((error) => {
                    dispatch(transformImageFailure("An error occurred while processing the image"))
                    console.error(error)
                })
        }
    }

    return (
        <div>
            {
                isTransformed ? (
                    <div className='flex justify-center items-center space-x-10'>
                        <Button variant={"secondary"} size={"lg"} onClick={() => window.open(transformedImageUrl || '', '_blank')}>Download Transformed</Button>
                        <Button variant={"secondary"} size={"lg"} onClick={() => dispatch(resetImageState())} >Reset</Button>
                    </div>
                ) : (
                    <div className="flex  gap-8">
                        <Button variant={"outline"} size={"lg"} onClick={ghibliHandler}  >Ghiblify</Button>
                        <Button variant={"outline"} size={"lg"}  >Calify</Button>
                    </div>

                )

            }

        </div>
    )
}

export default ButtonComponent