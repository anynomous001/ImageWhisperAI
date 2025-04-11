
import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    // TRANSFORM_IMAGE_REQUEST,
    // TRANSFORM_IMAGE_SUCCESS,
    // TRANSFORM_IMAGE_FAILURE,
    ANALYSIS_IMAGE_FAILURE,
    ANALYSIS_IMAGE_REQUEST,
    ANALYSIS_IMAGE_SUCCESS,
    RESET_IMAGE_STATE,
    UPLOAD_FORMDATA_SUCCESS,
    UPLOAD_FORMDATA_FAILURE
} from '@/redux/actions/imageActions';


export const initialState = {
    isAnalysis: false,
    isUploading: false,
    uploadError: null,
    analysisError: null,
    originalImageUrl: null,
    analyzedImageText: null,
    uploadSuccess: false,
    analysisSuccess: false,
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
        case ANALYSIS_IMAGE_REQUEST:
            return {
                ...state,
                isAnalysis: true,
                analysisError: null,
                analysisSuccess: false
            };
        case ANALYSIS_IMAGE_SUCCESS:
            return {
                ...state,
                isAnalysis: false,
                analyzedImageText: action.payload,
                analysisSuccess: true
            }
        case ANALYSIS_IMAGE_FAILURE:
            return {
                ...state,
                isAnalysis: false,
                analysisError: action.payload,
                analysisSuccess: false
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