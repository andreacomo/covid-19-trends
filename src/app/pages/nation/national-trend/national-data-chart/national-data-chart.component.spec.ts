import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalDataChartComponent } from './national-data-chart.component';

describe('NationalNewCasesChartComponent', () => {
  let component: NationalDataChartComponent;
  let fixture: ComponentFixture<NationalDataChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalDataChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
