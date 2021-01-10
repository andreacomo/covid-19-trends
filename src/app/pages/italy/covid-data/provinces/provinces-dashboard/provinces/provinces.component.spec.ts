import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProvincesComponent } from './provinces.component';

describe('ProvincesComponent', () => {
  let component: ProvincesComponent;
  let fixture: ComponentFixture<ProvincesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvincesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvincesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
