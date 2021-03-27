import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { VaccinationDistrictStatus } from '../../../models/vaccination-district-status';
import { DistrictsStatusChartService, DistrictsStatusChartType } from './districts-status-chart.service';

@Component({
  selector: 'app-districts-status-chart',
  templateUrl: './districts-status-chart.component.html',
  styleUrls: ['./districts-status-chart.component.scss']
})
export class DistrictsStatusChartComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinationDistrictStatus[];

  options: ChartOptions;

  selectedChartType: DistrictsStatusChartType;

  plugins: any[];

  labels: Label[];

  chartData: ChartDataSets[];

  constructor(private statusChartService: DistrictsStatusChartService) {
    this.selectedChartType = DistrictsStatusChartType.PERCENTAGE;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      this.init(this.selectedChartType, changes.data.currentValue);
    }
  }

  onChangeType(chartType: DistrictsStatusChartType): void {
    this.init(chartType, this.data);
    this.selectedChartType = chartType;
  }

  private init(chartType: DistrictsStatusChartType, data: VaccinationDistrictStatus[]) {
    const strategy = this.statusChartService.getStrategy(chartType, data);
    this.options = strategy.createOptions();
    this.labels = strategy.createLabels();
    this.chartData = strategy.createChartData();
    this.plugins = strategy.createPlugins();
  }
}
