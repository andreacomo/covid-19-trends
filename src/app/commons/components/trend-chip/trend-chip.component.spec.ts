import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrendChipComponent } from './trend-chip.component';

describe('TrendChipComponent', () => {
  let component: TrendChipComponent;
  let fixture: ComponentFixture<TrendChipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
