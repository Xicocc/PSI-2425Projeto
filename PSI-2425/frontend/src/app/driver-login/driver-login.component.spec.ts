import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverLoginComponent } from './driver-login.component';

describe('DriverLoginComponent', () => {
  let component: DriverLoginComponent;
  let fixture: ComponentFixture<DriverLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
