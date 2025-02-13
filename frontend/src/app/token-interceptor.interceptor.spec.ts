import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './token-interceptor.interceptor';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpService } from '@services/http/http.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [AuthInterceptor, HttpService, provideHttpClientTesting(), OverlayModule]
    });
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
