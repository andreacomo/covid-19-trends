import { Component, OnInit } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';

@Component({
  selector: 'app-districts-dashboard',
  templateUrl: './districts-dashboard.component.html',
  styleUrls: ['./districts-dashboard.component.scss']
})
export class DistrictsDashboardComponent implements OnInit {

  selectedDistricts: DistrictData[];

  constructor() { }

  ngOnInit() {
  }

  districtClicked(event: DistrictData[]) {
    this.selectedDistricts = event;
  }
}
