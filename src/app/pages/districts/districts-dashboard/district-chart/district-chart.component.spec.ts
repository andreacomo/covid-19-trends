import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DistrictChartComponent } from './district-chart.component';

describe('DistrictChartComponent', () => {
  let component: DistrictChartComponent;
  let fixture: ComponentFixture<DistrictChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
