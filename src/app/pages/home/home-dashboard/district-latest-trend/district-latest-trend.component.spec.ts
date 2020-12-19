import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DistrictLatestTrendComponent } from './district-latest-trend.component';

describe('DistrictLatestTrendComponent', () => {
  let component: DistrictLatestTrendComponent;
  let fixture: ComponentFixture<DistrictLatestTrendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictLatestTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictLatestTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
