import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';
import { DistrictData } from 'src/app/commons/models/district-data';
import { Observable } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';


@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.scss']
})
export class DistrictsComponent implements OnInit {

  districts: (DistrictData & {disabled: boolean})[];

  checkGroup: 'all' | 'none';

  @Output()
  clickItems: EventEmitter<DistrictData[]> = new EventEmitter<DistrictData[]>();

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.checkGroup = 'all';
    this.github.getDistricts()
      .subscribe(d => this.districts = d as (DistrictData & {disabled: boolean})[]);
  }

  toggle(district: DistrictData & {disabled: boolean}) {
    district.disabled = !district.disabled;
    this.calculateCheckGroup();
    this.clickItems.next([...this.districts]);
  }

  // called after app-toggle-buttons changed disabled values
  onCheckGroupChange(event: MatButtonToggleChange) {
    this.checkGroup = event.value;
    this.clickItems.next([...this.districts]); // cloning will trigger changes in child components...
  }

  private calculateCheckGroup() {
    if (this.districts.every(p => !p.disabled)) {
      this.checkGroup = 'all';
    } else if (this.districts.every(p => p.disabled)) {
      this.checkGroup = 'none';
    } else {
      this.checkGroup = null;
    }
  }

}
