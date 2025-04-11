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
    uploadFormDataSuccess,
    uploadFormDataFailure,
    resetImageState
} from '@/redux/actions/imageActions';
import { ImageTransformAction } from '@/actions/imageTransformAction';
import { useState } from 'react';
import { initialState } from '@/redux/reducers/imageReducers';
import { RootState } from '@/redux/store';

export interface UseImageUploadResult {
    handleImageUpload: (file: File) => void
}





export const useImageUpload = (): UseImageUploadResult => {

    const dispatch = useDispatch();
    const imageState = useSelector((state: RootState) => state.image);
    const [formData, setFormData] = useState(new FormData());

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

            formData.append("image", file)

            dispatch(uploadFormDataSuccess(formData))


        } catch (error) {
            dispatch(uploadImageFailure("An error occurred while uploading the image"));
            console.error(error);
        }
    }

    const reset = () => {
        dispatch(resetImageState());
    }

    return {
        ...imageState,
        handleImageUpload,
    }

}