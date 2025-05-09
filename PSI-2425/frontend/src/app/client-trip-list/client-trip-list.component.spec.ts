import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTripListComponent } from './client-trip-list.component';

describe('ClientTripListComponent', () => {
  let component: ClientTripListComponent;
  let fixture: ComponentFixture<ClientTripListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientTripListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
