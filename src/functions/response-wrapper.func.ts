import {ApiResponse, ApiResponseData} from '..';

export function wrapResponse(success: boolean, data?: ApiResponseData): ApiResponse {
    return {
        success,
        data
    }
}
