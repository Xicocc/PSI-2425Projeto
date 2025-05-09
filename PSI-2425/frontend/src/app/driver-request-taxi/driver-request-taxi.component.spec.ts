import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRequestTaxiComponent } from './driver-request-taxi.component';

describe('DriverRequestTaxiComponent', () => {
  let component: DriverRequestTaxiComponent;
  let fixture: ComponentFixture<DriverRequestTaxiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverRequestTaxiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverRequestTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
