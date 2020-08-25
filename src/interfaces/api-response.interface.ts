export interface ApiResponse {
    success: boolean,
    data?: ApiResponseData | []
}

export type ApiResponseData = Interface1;

export interface Interface1 {
    test: boolean
}
