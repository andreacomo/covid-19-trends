import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartTooltipItem } from 'chart.js';
import { AgeGroup } from '../../models/vaccination-age-group';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';

@Component({
  selector: 'app-age-groups-chart',
  templateUrl: './age-groups-chart.component.html',
  styleUrls: ['./age-groups-chart.component.scss']
})
export class AgeGroupsChartComponent implements OnInit, OnChanges {

  @Input()
  data: AgeGroup[];

  options: ChartOptions;

  colors: any[];

  plugins: any[];

  labels: Label[];

  chartData: number[];

  constructor() {
    this.plugins = [pluginDataLabels];
    this.colors = [{
      backgroundColor: Colors.SUPPORTED
    }];
    this.options = {
      responsive: true,
      aspectRatio: 2,
      legend: {
          display: true,
          position: 'top',
          align: 'center',
          labels: {
            boxWidth: 20,
            fontFamily: 'Roboto, \'Helvetica Neue\', sans-serif'
          }
      },
      tooltips: {
        enabled: true,
        callbacks: {
          title: (item: ChartTooltipItem[], data: ChartData) => {
            return this.labels[item[0].index];
          },
          label: (item: ChartTooltipItem, data: ChartData) => {
            return data.datasets[item.datasetIndex].data[item.index].toLocaleString();
          }
        }
      },
      plugins: {
        datalabels: {
          color: '#FFF',
          font: {
            weight: 'bold'
          },
          formatter: (value, ctx) => {
            const valuesAsNumber = parseInt(value, 10);
            if (valuesAsNumber > 6000) {
              return parseInt(value, 10).toLocaleString();
            } else {
              return '';
            }
          },
        },
      }
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      this.labels = this.data.map(d => d.range);
      this.chartData = this.data.map(d => d.doneCount);
    }
  }

}
