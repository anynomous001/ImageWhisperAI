
import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    TRANSFORM_IMAGE_REQUEST,
    TRANSFORM_IMAGE_SUCCESS,
    TRANSFORM_IMAGE_FAILURE,
    RESET_IMAGE_STATE,
    UPLOAD_FORMDATA_SUCCESS,
    UPLOAD_FORMDATA_FAILURE
} from '@/redux/actions/imageActions';


export const initialState = {
    isTransforming: false,
    isUploading: false,
    uploadError: null,
    transformError: null,
    originalImageUrl: null,
    transformedImageUrl: null,
    uploadSuccess: false,
    transformSuccess: false,
    uploaded: false,
    formdata: FormData,
    uploadFormdataError: null,
}


const imageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPLOAD_IMAGE_REQUEST:
            return {
                ...state,
                isUploading: true,
                uploadError: null,
                uploadSuccess: false,
                uploaded: false
            };
        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                isUploading: false,
                originalImageUrl: action.payload,
                uploadSuccess: true,
                uploaded: true
            };
        case UPLOAD_IMAGE_FAILURE:
            return {
                ...state,
                isUploading: false,
                uploadError: action.payload,
                uploadSuccess: false,
                uploaded: false
            };
        case TRANSFORM_IMAGE_REQUEST:
            return {
                ...state,
                isTransforming: true,
                transformError: null,
                transformSuccess: false
            };
        case TRANSFORM_IMAGE_SUCCESS:
            return {
                ...state,
                isTransforming: false,
                transformedImageUrl: action.payload,
                transformSuccess: true
            }
        case TRANSFORM_IMAGE_FAILURE:
            return {
                ...state,
                isTransforming: false,
                transformError: action.payload,
                transformSuccess: false
            };
        case UPLOAD_FORMDATA_SUCCESS:
            return {
                ...state,
                formdata: action.payload,
                uploadFormdataError: null
            };
        case UPLOAD_FORMDATA_FAILURE:
            return {
                ...state,
                uploadFormdataError: action.payload
            };

        case RESET_IMAGE_STATE:
            return {
                ...initialState
            };
        default:
            return state;

    }
}

export default imageReducer;