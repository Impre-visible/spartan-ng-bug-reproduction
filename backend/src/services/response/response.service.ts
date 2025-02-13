import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
    successResponse<T>(message: string, data: T = {} as T): any {
        return {
            message,
            data,
            error: false,
        };
    }

    errorResponse(message: string): any {
        return {
            message,
            data: {},
            error: true,
        };
    }
}
