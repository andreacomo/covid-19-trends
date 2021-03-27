import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictsPanelComponent } from './districts-panel.component';

describe('DistrictsPanelComponent', () => {
  let component: DistrictsPanelComponent;
  let fixture: ComponentFixture<DistrictsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
