import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DistrictPopulation } from 'src/app/commons/models/district-population';
import { VaccinationDistrictStatus } from '../../../models/vaccination-district-status';
import { DistrictsStatusChartService, DistrictsStatusChartType } from './districts-status-chart.service';

@Component({
  selector: 'app-districts-status-chart',
  templateUrl: './districts-status-chart.component.html',
  styleUrls: ['./districts-status-chart.component.scss']
})
export class DistrictsStatusChartComponent implements OnInit, OnChanges {

  @Input()
  vaccination: VaccinationDistrictStatus[];

  @Input()
  population: DistrictPopulation[];

  options: ChartOptions;

  selectedChartType: DistrictsStatusChartType;

  plugins: any[];

  labels: Label[];

  chartData: ChartDataSets[];

  constructor(private statusChartService: DistrictsStatusChartService) {
    this.selectedChartType = DistrictsStatusChartType.PERCENTAGE_ON_DELIVERED;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vaccination.currentValue && !changes.vaccination.previousValue &&
        changes.population.currentValue && !changes.population.previousValue) {
      this.init(this.selectedChartType, changes.vaccination.currentValue, changes.population.currentValue);
    }
  }

  onChangeType(chartType: DistrictsStatusChartType): void {
    this.init(chartType, this.vaccination, this.population);
    this.selectedChartType = chartType;
  }

  private init(chartType: DistrictsStatusChartType, vaccination: VaccinationDistrictStatus[], population: DistrictPopulation[]) {
    const strategy = this.statusChartService.getStrategy(chartType, vaccination, population);
    this.options = strategy.createOptions();
    this.labels = strategy.createLabels();
    this.chartData = strategy.createChartData();
    this.plugins = strategy.createPlugins();
  }
}
