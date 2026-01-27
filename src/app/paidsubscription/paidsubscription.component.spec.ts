import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidsubscriptionComponent } from './paidsubscription.component';

describe('PaidsubscriptionComponent', () => {
  let component: PaidsubscriptionComponent;
  let fixture: ComponentFixture<PaidsubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidsubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidsubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
