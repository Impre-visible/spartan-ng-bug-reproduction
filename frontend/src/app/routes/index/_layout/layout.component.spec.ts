import { TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: '123' }) } }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
