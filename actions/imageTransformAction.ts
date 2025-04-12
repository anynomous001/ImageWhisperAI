'use server';

// import fs from 'fs'
// import { revalidatePath } from 'next/cache';
// import sharp from 'sharp';
// import streamifier from 'streamifier';
// import { Readable } from 'stream';
// import { hf } from '@/lib/config'

import OpenAI from 'openai';
import dotenv from 'dotenv';
import { Buffer } from 'buffer';



dotenv.config();

export interface ActionResult {
    success: boolean;
    error?: string;
    analyzedImageText?: string;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const ImageTransformAction = async (formdata: FormData, originalImageUrl: string): Promise<ActionResult> => {
    try {
        const imageFile = formdata.get("image") as File;
        const arrayBuffer = await imageFile.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');

        if (!base64Image) {
            throw new Error("Could not convert image to base64");
        }


        // const response = await openai.responses.create({
        //     model: "gpt-4o-mini",
        //     input: [
        //         {
        //             role: "user",
        //             content: [
        //                 { type: "input_text", text: "you are an expert image describer use your creative sense with a mix of humour but don't use any sign or text modifier." },
        //                 {
        //                     type: "input_image",
        //                     image_url: `data:image/jpeg;base64,${base64Image}`,
        //                     detail: "high",
        //                 },
        //             ],
        //         },

        //     ],
        // });

        // console.log(response.output_text);


        const analyzedImageText = 'jvdnjvn'



        if (!analyzedImageText) {
            return { success: false, error: "Failed to generate variation image." };
        }





        return {
            success: true,
            analyzedImageText
        };
    } catch (error: any) {
        console.error('Error in image transformation:', error);

        if (error.response) {
            return {
                success: false,
                error: `API Error: ${error.ReferenceError || 'Unknown API error'}`
            };
        }

        return {
            success: false,
            error: error.message || 'An unexpected error occurred during image transformation'
        };
    }
};



const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};