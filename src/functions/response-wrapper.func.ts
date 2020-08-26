import {ApiResponse, ApiResponseData} from '../interfaces/api-response.interface';

export function wrapResponse(success: boolean, data?: ApiResponseData): ApiResponse {
    return {
        success,
        data
    }
}
