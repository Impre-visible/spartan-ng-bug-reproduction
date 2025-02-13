import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { OverlayModule } from '@angular/cdk/overlay';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HttpService, provideHttpClientTesting(), OverlayModule]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
