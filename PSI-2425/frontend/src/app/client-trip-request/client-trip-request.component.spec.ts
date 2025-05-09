import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTripRequestComponent } from './client-trip-request.component';

describe('ClientTripRequestComponent', () => {
  let component: ClientTripRequestComponent;
  let fixture: ComponentFixture<ClientTripRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientTripRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTripRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
