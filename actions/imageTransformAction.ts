// actions/upload.ts
'use server';

import { openai } from '@/lib/config';
import { revalidatePath } from 'next/cache';


export interface ActionResult {
    success: boolean
    error?: string;
    transformedImageUrl?: string;

}


export const ImageTransformAction = async (formdata: FormData): Promise<ActionResult> => {


    try {

        const imageFile = formdata.get("image") as File
        if (!imageFile) {
            return { success: false, error: 'No image provided' };
        }

        // Validate file type
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            return { success: false, error: 'Please upload a valid image file format (jpg, jpeg, png, gif)' };
        }

        // Validate file size (5MB limit)
        if (imageFile.size > 5 * 1024 * 1024) {
            return { success: false, error: 'File size exceeds the limit of 5MB' };
        }

        // Convert file to base64
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Call OpenAI API to transform the image to Ghibli style
        // const response = await openai.images.edit({
        //     image: buffer,
        //     prompt: "Transform this image into Studio Ghibli art style with soft pastel colors, expressive characters, detailed natural environments, and hand-drawn animation aesthetic",
        //     n: 1,
        //     size: "1024x1024",
        //     response_format: "url",
        // });

        const response = await new Promise<{ data: [{ url: string }] }>((resolve) => {


            setTimeout(() => {
                // Simulate a successful response from OpenAI API
                // Replace this with actual API call in production
            }, 2000)

            resolve({
                data: [
                    {
                        url: "https://images-stylist.s3-eu-west-1.amazonaws.com/app/uploads/2018/01/10150148/iStock-5184662221.jpg"
                    }
                ]
            });
        }); // Added missing parenthesis here

        // Refresh the page data
        // revalidatePath('/');

        // Return success with the transformed image URL
        return {
            success: true,
            transformedImageUrl: response.data[0].url
        };

    } catch (error: any) {
        console.error('Error in image transformation:', error);

        // Handle specific OpenAI API errors
        if (error.response) {
            return {
                success: false,
                error: `API Error: ${error.response.data?.error?.message || 'Unknown API error'}`
            };
        }

        return {
            success: false,
            error: error.message || 'An unexpected error occurred during image transformation'
        };

    }

}