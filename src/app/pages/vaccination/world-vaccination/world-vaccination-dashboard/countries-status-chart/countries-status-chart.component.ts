import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { CountryVaccinationStatus } from '../../models/country-vaccination-status';
import { WorldVaccinationStatus } from '../../models/world-vaccination-status';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from 'src/app/commons/models/colors';
import { EuropeanVaccinationDataFilter } from '../../services/world-vaccination-data-filter';

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
      aspectRatio: 1,
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
          font: {
            weight: 'bold'
          },
          anchor: 'end',
          align: (context) => {
            const index = context.dataIndex;
            const value = context.dataset.data[index];
            const maxXAsis = (context.chart as any).scales['x-axis-0'].max;
            const gap = parseInt(maxXAsis, 10) - (value as number);
            return gap < 100000 ? 'left' : 'right';
          },
          clamp: true,
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
      const countryWithMaxFieldValue = new EuropeanVaccinationDataFilter(field, 27).filter(this.data);

      this.labels = countryWithMaxFieldValue.map(c => c.countryName);
      const colors = [...Colors.SUPPORTED, ...Colors.SUPPORTED];
      this.chartData = [{
        data: countryWithMaxFieldValue.map(c => this.getFieldValue(field, c)),
        backgroundColor: colors,
        borderColor: colors,
        hoverBackgroundColor: colors.map(c => c + 'DD')
      }];
    }
  }

  private getFieldValue(fieldName: string, c: CountryVaccinationStatus): number {
    return c[fieldName];
  }
}
