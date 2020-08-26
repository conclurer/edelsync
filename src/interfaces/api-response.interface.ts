export interface ApiResponse {
    success: boolean;
    data?: ApiResponseData;
    error?: string;
}

export interface ApiResponseData {
    [key: string]: number | string | boolean | ApiResponseData | Array<number | string | boolean | ApiResponseData | unknown[]>
}
