"use client"

import { useDispatch, useSelector } from 'react-redux';
import {
    uploadImageRequest,
    uploadImageSuccess,
    uploadImageFailure,
    // transformImageRequest,
    // transformImageSuccess,
    // transformImageFailure,
    analysisImageRequest,
    analysisImageSuccess,
    analysisImageFailure,
    resetImageState
} from '@/redux/actions/imageActions';
import { ImageTransformAction } from '@/actions/imageTransformAction';
import { useState } from 'react';
import { initialState } from '@/redux/reducers/imageReducers';
import { RootState } from '@/redux/store';

let currentFormData: FormData | null = null;

export interface UseImageUploadResult {
    handleImageUpload: (file: File) => void;
    getCurrentFormData: () => FormData | null;
    reset: () => void;
}

export const useImageUpload = (): UseImageUploadResult => {

    const dispatch = useDispatch();
    // const {
    // } = useSelector((state: RootState) => state.image);

    const handleImageUpload = (file: File): void => {

        if (!file) {
            dispatch(uploadImageFailure("Please upload a valid image file."));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            dispatch(uploadImageFailure("File size exceeds the limit of 5MB."));
            return;
        }

        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            dispatch(uploadImageFailure("Please upload a valid image file format (jpg, jpeg, png, gif)."));
            return;
        }


        try {
            dispatch(uploadImageRequest());


            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async (e: any) => {
                dispatch(uploadImageSuccess(e.target.result));
            }

            try {
                currentFormData = new FormData();
                currentFormData.append("image", file);
            } catch (error) {
                console.log(error)
            }



        } catch (error) {
            dispatch(uploadImageFailure("An error occurred while uploading the image"));
            console.error(error);
        }
    }


    const getCurrentFormData = (): FormData | null => {
        return currentFormData;
    };

    const reset = () => {
        dispatch(resetImageState());
        currentFormData = null;

    }

    return {
        handleImageUpload,
        getCurrentFormData,
        reset
    }

}