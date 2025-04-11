import OpenAI from "openai";
import dotenv from 'dotenv';


import { HfInference } from '@huggingface/inference'

dotenv.config();

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


export const hf = new HfInference(process.env.HF_TOKEN)
