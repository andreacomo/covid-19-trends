import { Component, OnInit } from '@angular/core';
import { LocalDataService } from 'src/app/commons/services/local-data.service';

@Component({
  selector: 'app-district-lockdown-levels',
  templateUrl: './district-lockdown-levels.component.html',
  styleUrls: ['./district-lockdown-levels.component.scss']
})
export class DistrictLockdownLevelsComponent implements OnInit {

  districtColors: {[color: string]: number};

  date: string;

  constructor(private localDataService: LocalDataService) { }

  ngOnInit() {
    this.localDataService.getDistrictsLockdownColors()
      .subscribe(districts => {
        const regulation = districts.data[districts.data.length - 1];

        this.date = regulation.validFromDate;

        this.districtColors = regulation.scenarios.reduce((acc, scenario) => {
          acc[scenario.color] = scenario.districts.length;
          return acc;
        }, {} as {[color: string]: number});
      });
  }

}
