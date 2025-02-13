interface BaseResponse<T> {
    message: string;
    data: T;
    error: boolean;
}

export type { BaseResponse };