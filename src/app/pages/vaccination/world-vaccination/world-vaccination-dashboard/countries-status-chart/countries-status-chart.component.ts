import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { CountryVaccinationStatus } from '../../models/country-vaccination-status';
import { WorldVaccinationStatus } from '../../models/world-vaccination-status';

@Component({
  selector: 'app-countries-status-chart',
  templateUrl: './countries-status-chart.component.html',
  styleUrls: ['./countries-status-chart.component.scss']
})
export class CountriesStatusChartComponent implements OnInit, OnChanges {

  @Input()
  data: WorldVaccinationStatus[];

  options: ChartOptions;

  plugins: any[];

  labels: Label[];

  chartData: ChartDataSets[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      const countryWithMaxTotalVaccinationsPerHundred = this.data
        .map(country => country.data.reduce(this.maxTotalVaccinationsPerHundred))
        .sort((c1, c2) => c2.totalVaccinationsPerHundred - c1.totalVaccinationsPerHundred)
        .slice(0, 20);
      this.labels = countryWithMaxTotalVaccinationsPerHundred.map(c => c.countryName);
      this.chartData = [{
        data: countryWithMaxTotalVaccinationsPerHundred.map(c => c.totalVaccinationsPerHundred)
      }];
    }
  }

  private maxTotalVaccinationsPerHundred(prev: CountryVaccinationStatus, current: CountryVaccinationStatus): CountryVaccinationStatus {
    return prev.totalVaccinationsPerHundred > current.totalVaccinationsPerHundred ? prev : current;
  }
}
