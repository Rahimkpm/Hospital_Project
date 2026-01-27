import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentscardsComponent } from './appointmentscards.component';

describe('AppointmentscardsComponent', () => {
  let component: AppointmentscardsComponent;
  let fixture: ComponentFixture<AppointmentscardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentscardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentscardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
