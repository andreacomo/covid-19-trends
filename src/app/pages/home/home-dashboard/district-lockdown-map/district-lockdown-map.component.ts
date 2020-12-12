import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Regulation } from 'src/app/commons/models/districts-lockdown-colors';
import { LocalDataService } from 'src/app/commons/services/local-data.service';

@Component({
  selector: 'app-district-lockdown-map',
  templateUrl: './district-lockdown-map.component.svg',
  styleUrls: ['./district-lockdown-map.component.scss']
})
export class DistrictLockdownMapComponent implements OnInit, OnChanges {

  @Input()
  regulation: Regulation;

  data: {[district: string]: string};

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = this.regulation.scenarios
      .map(scenario => {
        return scenario.districts.reduce((acc, district) => {
          const normalizedDistrict = district.replace(/\s|-|'/g, '').toLowerCase();
          acc[normalizedDistrict] = scenario.color.toLowerCase();
          return acc;
        }, {});
      })
      .reduce((acc, scenario) => {
        return {...acc, ...scenario};
      }, {});
  }

  getColor(district) {
    return this.data[district];
  }

}
