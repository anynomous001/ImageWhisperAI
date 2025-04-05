"use client"

import React from 'react'
import { Button } from '../ui/button'

import { ImageTransformAction } from '@/actions/imageTransformAction'

interface ButtonComponentProps {
    reset?: () => void
    formdata?: FormData
}

const ButtonComponent = ({ reset, formdata }: ButtonComponentProps) => {

    const [isTransformed, setIsTransformed] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState<boolean>(false)
    const [transformedImageUrl, setTransformedImageUrl] = React.useState<string | null>(null)

    const ghibliHandler = () => {
        setIsTransformed(true)
        if (formdata) {
            setIsLoading(true)
            ImageTransformAction(formdata)
                .then((response) => {
                    if (response.success) {
                        console.log(response)
                        //@ts-ignore
                        setTransformedImageUrl(response.transformedImageUrl)
                        setSuccess(true)
                    } else {
                        setError(response.error || "An error occurred while processing the image.");
                    }
                })
                .catch((error) => {
                    setError("An error occurred while processing the image");
                    console.error(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

    }

    return (
        <div>
            {
                isTransformed ? (
                    <div className='flex justify-center items-center space-x-10'>
                        <Button variant={"secondary"} size={"lg"} onClick={() => window.open(transformedImageUrl || '', '_blank')}>Download Transformed</Button>
                        <Button variant={"secondary"} size={"lg"} onClick={reset} >Reset</Button>
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