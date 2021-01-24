import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorldVaccinationMetric } from '../models/world-vaccination-metric';
import { WorldVaccinationStatus } from '../models/world-vaccination-status';
import { WorldVaccinationService } from '../services/world-vaccination.service';

@Component({
  selector: 'app-world-vaccination-dashboard',
  templateUrl: './world-vaccination-dashboard.component.html',
  styleUrls: ['./world-vaccination-dashboard.component.scss']
})
export class WorldVaccinationDashboardComponent implements OnInit {

  worldData$: Observable<WorldVaccinationStatus[]>;

  selectedMetric: WorldVaccinationMetric;

  metrics: WorldVaccinationMetric[] = [{
    field: 'totalVaccinations',
    label: 'Dosi somministrate',
    icon: 'timeline',
    isSvg: false,
    isPercent: false
  }, {
    field: 'totalVaccinationsPerHundred',
    label: 'Somministrazioni ogni 100 persone',
    icon: 'percent',
    isSvg: true,
    isPercent: true
  }];

  constructor(private vaccinationService: WorldVaccinationService) {
    this.selectedMetric = this.metrics[0];
  }

  ngOnInit(): void {
    this.worldData$ = this.vaccinationService.getWorldVaccination();
  }

  onChangeMetric(value: WorldVaccinationMetric) {
    this.selectedMetric = value;
  }
}
