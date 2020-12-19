import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DistrictLatestTableComponent } from './district-latest-table.component';

describe('DistrictLatestTableComponent', () => {
  let component: DistrictLatestTableComponent;
  let fixture: ComponentFixture<DistrictLatestTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictLatestTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictLatestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
