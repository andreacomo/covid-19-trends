import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalTrendComponent } from './national-trend.component';

describe('NationalTrendComponent', () => {
  let component: NationalTrendComponent;
  let fixture: ComponentFixture<NationalTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
