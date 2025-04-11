import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiRegisterComponent } from './taxi-register.component';

describe('TaxiRegisterComponent', () => {
  let component: TaxiRegisterComponent;
  let fixture: ComponentFixture<TaxiRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxiRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxiRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
