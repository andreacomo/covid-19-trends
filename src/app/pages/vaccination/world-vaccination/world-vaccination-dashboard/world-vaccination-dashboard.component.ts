import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, GoogeAnalyticsService } from 'src/app/commons/services/googe-analytics.service';
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
    metric: 'total_vaccinations',
    label: 'Dosi somministrate',
    icon: 'timeline',
    isSvg: false,
    isPercent: false
  }, {
    field: 'totalVaccinationsPerHundred',
    metric: 'total_vaccinations_per_hundred',
    label: 'Somministrazioni ogni 100 persone',
    icon: 'percent',
    isSvg: true,
    isPercent: true
  }];

  constructor(private vaccinationService: WorldVaccinationService,
              private googleAnalyticsService: GoogeAnalyticsService) {
    this.selectedMetric = this.metrics[0];
  }

  ngOnInit(): void {
    this.worldData$ = this.vaccinationService.getWorldVaccination();
  }

  onChangeMetric(value: WorldVaccinationMetric) {
    this.selectedMetric = value;

    this.googleAnalyticsService.emitEvent(
      `world_vaccination_metric_selector_switch_chart_type_${value.metric}`,
      value.label,
      Category.CHART_TYPE_SWITCH
    );
  }
}
