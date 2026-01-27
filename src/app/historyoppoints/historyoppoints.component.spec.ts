import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryoppointsComponent } from './historyoppoints.component';

describe('HistoryoppointsComponent', () => {
  let component: HistoryoppointsComponent;
  let fixture: ComponentFixture<HistoryoppointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryoppointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryoppointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
