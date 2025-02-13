import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrestaComponent } from './create-presta.component';

describe('CreatePrestaComponent', () => {
  let component: CreatePrestaComponent;
  let fixture: ComponentFixture<CreatePrestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePrestaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreatePrestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
