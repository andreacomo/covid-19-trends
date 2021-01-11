import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { CountryVaccinationStatus } from '../../models/country-vaccination-status';
import { WorldVaccinationStatus } from '../../models/world-vaccination-status';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from 'src/app/commons/models/colors';

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

  constructor() {
    this.plugins = [pluginDataLabels];
    this.options = {
      responsive: true,
      aspectRatio: 2,
      legend: {
        display: true,
        position: 'top',
        align: 'center',
        labels: {
        boxWidth: 13,
        fontFamily: 'Roboto, \'Helvetica Neue\', sans-serif'
        }
      },
      tooltips: {
          enabled: false
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
          formatter: (value, ctx) => {
            return parseInt(value, 10).toLocaleString();
          }
        }
      }
    };
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      const field = 'totalVaccinations';
      const countryWithMaxFieldValue = this.data
        .map(country => country.data.reduce((prev, curr) => this.max(field, prev, curr)))
        .sort((c1, c2) => this.sort(field, c1, c2))
        .slice(0, 20);
      this.labels = countryWithMaxFieldValue.map(c => c.countryName);
      this.chartData = [{
        data: countryWithMaxFieldValue.map(c => this.getFieldValue(field, c)),
        backgroundColor: Colors.SUPPORTED,
        borderColor: Colors.SUPPORTED,
        hoverBackgroundColor: Colors.SUPPORTED.map(c => c + 'DD')
      }];
    }
  }

  private max(fieldName: string, prev: CountryVaccinationStatus, current: CountryVaccinationStatus): CountryVaccinationStatus {
    return prev[fieldName] > current[fieldName] ? prev : current;
  }

  private sort(fieldName: string, c1: CountryVaccinationStatus, c2: CountryVaccinationStatus): number {
    return c2[fieldName] - c1[fieldName];
  }

  private getFieldValue(fieldName: string, c: CountryVaccinationStatus): number {
    return c[fieldName];
  }
}
