import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageAdapterComponent } from './percentage-adapter.component';

describe('PercentageFilterComponent', () => {
  let component: PercentageAdapterComponent;
  let fixture: ComponentFixture<PercentageAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageAdapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
