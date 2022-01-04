import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { VaccinationAgeGroup } from '../../../models/vaccination-age-group';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';
import { Numbers } from 'src/app/commons/models/numbers';
import ChartOptionsFactory from 'src/app/commons/services/chart-options.factory';

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
    // this.plugins = [pluginDataLabels];
    this.options = {
      ...ChartOptionsFactory.createDefault(),
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          stacked: true,
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
        enabled: true,
        mode: 'label',
        callbacks: {
          label: (item: ChartTooltipItem, data: ChartData) => {
            return `${data.datasets[item.datasetIndex].label}: ${Numbers.beautifyWithSeparators(item.value)}`;
          },
          footer: (item: ChartTooltipItem[], data: ChartData) => {
            const total = item.reduce((a, e) => a + (e.yLabel as number), 0);
            return `Total: ${Numbers.beautifyWithSeparators(total.toString())}`;
          }
        }
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
        data: this.data.map(d => d.doses.first),
        label: 'Prima dose',
        backgroundColor: Colors.DOSE_1 + 'BB',
        borderColor: Colors.DOSE_1 + 'BB',
        hoverBackgroundColor: Colors.DOSE_1,
        hoverBorderColor: Colors.DOSE_1,
      }, {
        data: this.data.map(d => d.doses.second),
        label: 'Seconda dose',
        backgroundColor: Colors.DOSE_2 + 'BB',
        borderColor: Colors.DOSE_2 + 'BB',
        hoverBackgroundColor: Colors.DOSE_2,
        hoverBorderColor: Colors.DOSE_2,
      }, {
        data: this.data.map(d => d.doses.third),
        label: 'Terza dose',
        backgroundColor: Colors.DOSE_3 + 'BB',
        borderColor: Colors.DOSE_3 + 'BB',
        hoverBackgroundColor: Colors.DOSE_3,
        hoverBorderColor: Colors.DOSE_3,
      }, {
        data: this.data.map(d => d.doses.afterHealing),
        label: 'Dose a guariti',
        backgroundColor: Colors.DOSE_AH + 'BB',
        borderColor: Colors.DOSE_AH + 'BB',
        hoverBackgroundColor: Colors.DOSE_AH,
        hoverBorderColor: Colors.DOSE_AH,
      }];
    }
  }

}
