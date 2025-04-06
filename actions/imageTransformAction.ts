// actions/upload.ts
'use server';

import { openai } from '@/lib/config';
import { revalidatePath } from 'next/cache';
import sharp from 'sharp'

export interface ActionResult {
    success: boolean
    error?: string;
    transformedImageUrl?: string;

}

export const ImageTransformAction = async (formdata: FormData, originalImageUrl: string): Promise<ActionResult> => {
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

        // Convert file to base64 for API consumption
        // Inside your ImageTransformAction function

        // Convert directly from FormData to PNG
        const pngBuffer = await sharp(await imageFile.arrayBuffer())
            .toFormat('png')
            .toBuffer();

        // Create base64 URL
        const imageUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`;

        console.log('Processed PNG URL:', imageUrl);
        /**
         * need s3 deployment for that you need credit/debit card
         */



        // Set up headers for the modelslab API request
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Prepare the request payload
        const requestBody = JSON.stringify({
            "key": process.env.KEY,
            "prompt": "Transform this image into Studio Ghibli art style with soft pastel colors, expressive characters, detailed natural environments, and hand-drawn animation aesthetic",
            "negative_prompt": "bad quality, distorted, unrealistic",
            "init_image": imageUrl, // Use the base64 image
            "width": "512",
            "height": "512",
            "samples": "1",
            "temp": false,
            "safety_checker": false,
            "strength": 0.7,
            "seed": null,
            "webhook": null,
            "track_id": null
        });

        // Make the API request to modelslab
        const response = await fetch("https://modelslab.com/api/v6/realtime/img2img", {
            method: 'POST',
            headers: myHeaders,
            body: requestBody,
            redirect: 'follow'
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const result = await response.json();

        // Check if the API call was successful and returned output images
        if (result.status === 'success' && result.output && result.output.length > 0) {
            // Return success with the transformed image URL
            return {
                success: true,
                transformedImageUrl: result.output[0]
            };
        } else {
            // Handle the case where output is not available
            console.log('API response did not contain output images:', result);
            return {
                success: false,
                error: 'Failed to generate transformed image'
            };
        }

    } catch (error: any) {
        console.error('Error in image transformation:', error);

        // Handle specific API errors
        if (error.response) {
            return {
                success: false,
                error: `API Error: ${error.response?.data?.error?.message || 'Unknown API error'}`
            };
        }

        return {
            success: false,
            error: error.message || 'An unexpected error occurred during image transformation'
        };
    }
}