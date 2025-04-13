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
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

dotenv.config();

export interface ActionResult {
    success: boolean;
    error?: string;
    analyzedImageText?: string;
    retryAfter?: number;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
console.log(process.env.UPSTASH_REDIS_URL)
console.log(process.env.UPSTASH_REDIS_TOKEN)

// const redis = new Redis({
//     url: process.env.UPSTASH_REDIS_URL || '',
//     token: process.env.UPSTASH_REDIS_TOKEN || '',
// });

const redis = Redis.fromEnv();

// Create a new ratelimiter that allows 5 requests per 24 hours
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, '24 h'), // Increased to 5 requests as mentioned in comment
    analytics: true,
    prefix: '@upstash/ratelimit',

});

export const ImageTransformAction = async (formdata: FormData, originalImageUrl: string): Promise<ActionResult> => {
    try {
        // Rate limit by IP
        const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';
        console.log(ip)

        try {
            const { success, reset, remaining } = await ratelimit.limit(ip);

            if (!success) {
                const retryAfter = Math.floor((reset - Date.now()) / 1000);
                return {
                    success: false,
                    error: `Rate limit exceeded. You can try again in ${Math.floor(retryAfter / 60)} minutes.`,
                    retryAfter
                };
            }
        } catch (ratelimitError) {
            console.error('Rate limiting error:', ratelimitError);
            // Continue execution even if rate limiting fails
        }

        const imageFile = formdata.get("image") as File;
        const arrayBuffer = await imageFile.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');

        if (!base64Image) {
            throw new Error("Could not convert image to base64");
        }


        const response = await openai.responses.create({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "user",
                    content: [
                        { type: "input_text", text: "you are an expert image describer but don't use any sign or text modifier. don't use '*' to make points bold use simple patterns of written english, don't use newline explain image in one para" },
                        {
                            type: "input_image",
                            image_url: `data:image/jpeg;base64,${base64Image}`,
                            detail: "high",
                        },
                    ],
                },

            ],
        });

        console.log(response.output_text);


        const analyzedImageText = response.output_text



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