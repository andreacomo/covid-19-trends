import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalLatestComponent } from './national-latest.component';

describe('NationalLatestComponent', () => {
  let component: NationalLatestComponent;
  let fixture: ComponentFixture<NationalLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
