import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LineChartStrokeComponent } from './line-chart-stroke.component';

describe('LineChartSelectorComponent', () => {
  let component: LineChartStrokeComponent;
  let fixture: ComponentFixture<LineChartStrokeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartStrokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
