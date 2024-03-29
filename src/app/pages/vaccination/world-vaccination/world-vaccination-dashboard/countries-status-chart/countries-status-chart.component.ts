import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { CountryVaccinationStatus } from '../../models/country-vaccination-status';
import { WorldVaccinationStatus } from '../../models/world-vaccination-status';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from 'src/app/commons/models/colors';
import { EuropeanVaccinationDataFilter } from '../../services/world-vaccination-data-filter';
import { WorldVaccinationMetric } from '../../models/world-vaccination-metric';
import { Numbers } from 'src/app/commons/models/numbers';
import ChartOptionsFactory from 'src/app/commons/services/chart-options.factory';

@Component({
  selector: 'app-countries-status-chart',
  templateUrl: './countries-status-chart.component.html',
  styleUrls: ['./countries-status-chart.component.scss']
})
export class CountriesStatusChartComponent implements OnInit, OnChanges {

  @Input()
  data: WorldVaccinationStatus[];

  @Input()
  selected: WorldVaccinationMetric;

  options: ChartOptions;

  plugins: any[];

  labels: Label[];

  chartData: ChartDataSets[];

  constructor() {
    this.plugins = [pluginDataLabels];
    this.options = {
      ...ChartOptionsFactory.createDefault(),
      aspectRatio: 1,
      tooltips: {
          enabled: false
      },
      scales: {
        xAxes: [{
          ticks: {
            callback: (value, index, values) => {
              if (value > 1000) {
                return Numbers.beautifyZeroesAsText(value as number);
              } else {
                return value;
              }
            }
          }
        }]
      },
      plugins: {
        datalabels: {
          font: {
            weight: 'bold'
          },
          anchor: 'end',
          align: (context) => {
            if (this.selected.isPercent) {
              return 'right';
            } else {
              const index = context.dataIndex;
              const value = context.dataset.data[index];
              const maxXAsis = (context.chart as any).scales['x-axis-0'].max;
              const gap = parseInt(maxXAsis, 10) - (value as number);
              return gap < 1000000 ? 'left' : 'right';
            }
          },
          clamp: true,
          formatter: (value, ctx) => {
            if (this.selected.isPercent) {
              return Numbers.appendPercentWithPrecisionFromString(value);
            } else {
              return Numbers.beautifyWithSeparators(value);
            }
          }
        }
      }
    };
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected.currentValue) {
      const field = this.selected.field;
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
