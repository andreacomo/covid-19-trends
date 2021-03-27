import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';
import { VaccinationCategoryGroup } from '../../../models/vaccination-category-group';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Numbers } from 'src/app/commons/models/numbers';

@Component({
  selector: 'app-category-groups-chart',
  templateUrl: './category-groups-chart.component.html',
  styleUrls: ['./category-groups-chart.component.scss']
})
export class CategoryGroupsChartComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinationCategoryGroup[];

  options: ChartOptions;

  colors: any[];

  plugins: any[];

  labels: Label[];

  chartData: number[];

  constructor() {
    this.plugins = [pluginDataLabels];
    this.colors = [{
      backgroundColor: [
        Colors.SUPPORTED[10],
        Colors.SUPPORTED[12],
        Colors.SUPPORTED[13],
        Colors.SUPPORTED[14],
        Colors.SUPPORTED[8],
        Colors.SUPPORTED[2]
      ]
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
            return Numbers.beautifyWithSeparators(value);
          },
        },
      }
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      this.labels = this.data.map(d => d.name);
      this.chartData = this.data.map(d => d.doneCount);
    }
  }

}
