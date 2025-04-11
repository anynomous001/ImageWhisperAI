export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";
// export const TRANSFORM_IMAGE_REQUEST = "TRANSFORM_IMAGE_REQUEST";
// export const TRANSFORM_IMAGE_SUCCESS = "TRANSFORM_IMAGE_SUCCESS";
// export const TRANSFORM_IMAGE_FAILURE = "TRANSFORM_IMAGE_FAILURE";
export const ANALYSIS_IMAGE_REQUEST = "ANALYSIS_IMAGE_REQUEST";
export const ANALYSIS_IMAGE_SUCCESS = "ANALYSIS_IMAGE_SUCCESS";
export const ANALYSIS_IMAGE_FAILURE = "ANALYSIS_IMAGE_FAILURE";

export const UPLOAD_FORMDATA_SUCCESS = "UPLOAD_FORMDATA_SUCCESS";
export const UPLOAD_FORMDATA_FAILURE = "UPLOAD_FORMDATA_FAILURE";
export const RESET_IMAGE_STATE = "RESET_IMAGE_STATE";

export const uploadImageRequest = () => ({
    type: UPLOAD_IMAGE_REQUEST,
});
export const uploadImageSuccess = (originalImageUrl: string) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: originalImageUrl,
});
export const uploadImageFailure = (error: string) => ({
    type: UPLOAD_IMAGE_FAILURE,
    payload: error,
});
export const analysisImageRequest = () => ({
    type: ANALYSIS_IMAGE_REQUEST,
});
// export const transformImageSuccess = (transformedImageUrl: string) => ({
//     type: TRANSFORM_IMAGE_SUCCESS,
//     payload: transformedImageUrl,
// });
export const analysisImageSuccess = (analyzedImageText: string) => ({
    type: ANALYSIS_IMAGE_SUCCESS,
    payload: analyzedImageText,
});
export const analysisImageFailure = (error: string) => ({
    type: ANALYSIS_IMAGE_FAILURE,
    payload: error,
});
export const resetImageState = () => ({
    type: RESET_IMAGE_STATE,
});


export const uploadFormDataSuccess = (formdata: FormData) => ({
    type: UPLOAD_FORMDATA_SUCCESS,
    payload: formdata,
});
export const uploadFormDataFailure = (error: string) => ({
    type: UPLOAD_FORMDATA_FAILURE,
    payload: error,
});
