import { Component, Input, OnInit } from '@angular/core';
import { DistrictPopulation } from 'src/app/commons/models/district-population';
import { VaccinationDoses } from '../../models/vaccination-doses';

@Component({
  selector: 'app-people-coverage-status-card',
  templateUrl: './people-coverage-status-card.component.html',
  styleUrls: ['./people-coverage-status-card.component.scss']
})
export class PeopleCoverageStatusCardComponent implements OnInit {

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
