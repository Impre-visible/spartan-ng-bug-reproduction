import { TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SettingsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
