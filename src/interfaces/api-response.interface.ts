export interface ApiResponse {
    success: boolean;
    data?: ApiResponseData | [];
    error?: string;
}

export type ApiResponseData = Interface1;

export interface Interface1 {
    test: boolean
}
