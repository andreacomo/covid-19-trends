import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictLatestTableComponent } from './district-latest-table.component';

describe('DistrictLatestTableComponent', () => {
  let component: DistrictLatestTableComponent;
  let fixture: ComponentFixture<DistrictLatestTableComponent>;

  beforeEach(async(() => {
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
