import { Component, Input, OnInit } from '@angular/core';
import { DistrictPopulation } from 'src/app/commons/models/district-population';
import { VaccinationDistrictOverallStatus } from '../../models/vaccination-district-overall-status';
import { VaccinationDoses } from '../../models/vaccination-doses';

@Component({
  selector: 'app-overall-status-card',
  templateUrl: './overall-status-card.component.html',
  styleUrls: ['./overall-status-card.component.scss']
})
export class OverallStatusCardComponent implements OnInit {

  @Input()
  data: VaccinationDistrictOverallStatus;

  @Input()
  totals: VaccinationDoses;

  @Input()
  population: DistrictPopulation[];

  totalPopulation: number;

  constructor() { }

  ngOnInit(): void {
    this.totalPopulation = this.population.reduce((sum, p) => sum + p.popolazione, 0);
  }

}
