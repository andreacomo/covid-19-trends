import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataDecoratorsComponent } from './data-decorators.component';

describe('PercentageFilterComponent', () => {
  let component: DataDecoratorsComponent;
  let fixture: ComponentFixture<DataDecoratorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDecoratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDecoratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
