import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalNewCasesChartComponent } from './national-new-cases-chart.component';

describe('NationalNewCasesChartComponent', () => {
  let component: NationalNewCasesChartComponent;
  let fixture: ComponentFixture<NationalNewCasesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalNewCasesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalNewCasesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
