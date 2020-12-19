import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LineChartLegendComponent } from './line-chart-legend.component';

describe('LineChartLegendComponent', () => {
  let component: LineChartLegendComponent;
  let fixture: ComponentFixture<LineChartLegendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
