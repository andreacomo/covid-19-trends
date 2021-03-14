import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { VaccinationAgeGroup } from '../../models/vaccination-age-group';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';
import { Numbers } from 'src/app/commons/models/numbers';

@Component({
  selector: 'app-age-groups-chart',
  templateUrl: './age-groups-chart.component.html',
  styleUrls: ['./age-groups-chart.component.scss']
})
export class AgeGroupsChartComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinationAgeGroup[];

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
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: true
          },
          ticks: {
            callback: (value, index, values) => {
              return Numbers.beautifyZeroesAsText(value as number);
            }
          }
        }]
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
          align: 'end',
          offset: -2,
          formatter: (value, ctx) => {
            return Numbers.beautifyWithSeparators(value);
          }
        },
      }
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      this.labels = this.data.map(d => d.range);
      this.chartData = [{
        data: this.data.map(d => d.doneCount),
        backgroundColor: Colors.SUPPORTED,
        hoverBackgroundColor: Colors.SUPPORTED
      }];
    }
  }

}
