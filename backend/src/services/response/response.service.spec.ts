import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';
import { BaseResponseDto } from '@dto/response';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseService],
    }).compile();

    service = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('successResponse', () => {
    it('should return a BaseResponseDto with success status and data', () => {
      const message = 'Success message';
      const data = { key: 'value' };
      const response = service.successResponse(message, data);

      expect(response).toEqual<BaseResponseDto<typeof data>>({
        message,
        data,
        error: false,
      });
    });

    it('should return a BaseResponseDto with success status and empty data', () => {
      const message = 'Success message';
      const response = service.successResponse(message);

      expect(response).toEqual<BaseResponseDto>({
        message,
        data: {},
        error: false,
      });
    });
  })

  describe('errorResponse', () => {
    it('should return a BaseResponseDto with error status and empty data', () => {
      const message = 'Error message';
      const response = service.errorResponse(message);

      expect(response).toEqual<BaseResponseDto>({
        message,
        data: {},
        error: true,
      });
    });
  })
});
