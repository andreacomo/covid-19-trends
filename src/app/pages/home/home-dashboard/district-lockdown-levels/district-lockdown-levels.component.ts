import { Component, OnInit } from '@angular/core';
import { Regulation } from 'src/app/commons/models/districts-lockdown-colors';
import { DistrictLockdownLevelsService } from './district-lockdown-levels.service';

@Component({
  selector: 'app-district-lockdown-levels',
  templateUrl: './district-lockdown-levels.component.html',
  styleUrls: ['./district-lockdown-levels.component.scss']
})
export class DistrictLockdownLevelsComponent implements OnInit {

  districtColors: {[color: string]: number};

  date: string;

  regulation: Regulation;

  allRegulations: Regulation[];

  source: string;

  constructor(private districtLockdownService: DistrictLockdownLevelsService) { }

  ngOnInit() {
    this.districtLockdownService.getData()
      .subscribe(districts => {
        this.source = districts.source;
        this.allRegulations = districts.data;

        this.changeRegulation(districts.data.length - 1);
      });
  }

  changeRegulation(index: number) {
    this.regulation = this.allRegulations[index];

    this.date = this.regulation.validFromDate;

    this.districtColors = this.regulation.scenarios.reduce((acc, scenario) => {
      acc[scenario.color] = scenario.districts.length;
      return acc;
    }, {} as {[color: string]: number});
  }

}
