import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageFilterComponent } from './percentage-filter.component';

describe('PercentageFilterComponent', () => {
  let component: PercentageFilterComponent;
  let fixture: ComponentFixture<PercentageFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
