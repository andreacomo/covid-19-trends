import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProvincesChartComponent } from './provinces-chart.component';

describe('ChartsComponent', () => {
  let component: ProvincesChartComponent;
  let fixture: ComponentFixture<ProvincesChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvincesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvincesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
