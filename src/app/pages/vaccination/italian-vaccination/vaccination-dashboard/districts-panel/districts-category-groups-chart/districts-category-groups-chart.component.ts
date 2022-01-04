import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';
import { ItalianVaccinationCategories } from 'src/app/commons/models/italian-vaccination-category';
import { Numbers } from 'src/app/commons/models/numbers';
import ChartOptionsFactory from 'src/app/commons/services/chart-options.factory';

@Component({
  selector: 'app-districts-category-groups-chart',
  templateUrl: './districts-category-groups-chart.component.html',
  styleUrls: ['./districts-category-groups-chart.component.scss']
})
export class DistrictsCategoryGroupsChartComponent implements OnInit, OnChanges {

  @Input()
  data: ItalianVaccinationCategories;

  options: ChartOptions;

  plugins: any[];

  labels: Label[];

  chartData: ChartDataSets[];

  constructor() {
    this.options = {
      ...ChartOptionsFactory.createDefault(),
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            callback: (value, index, values) => {
              return Numbers.beautifyZeroesAsText(value as number);
            }
          }
        }],
        yAxes: [{
          stacked: true
        }]
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: (item: ChartTooltipItem, data: ChartData) => {
            return `${data.datasets[item.datasetIndex].label}: ${Numbers.beautifyWithSeparators(item.value)}`;
          },
        }
      }
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      const colors = Colors.SUPPORTED.slice(4);
      this.labels = Object.values(this.data)[0].map(category => category.districtName).sort();

      this.chartData = Object.values(this.data)
        .filter(categories => categories[0].type === 'administration')
        .map((categories, i) => {
          const sorted = categories.sort((c1, c2) => c1.districtName.localeCompare(c2.districtName));
          return {
            data: sorted.map(c => c.doneCount),
            label: sorted[0].name,
            backgroundColor: colors[i] + 'AA',
            borderColor: colors[i] + 'AA',
            hoverBackgroundColor: colors[i],
            hoverBorderColor: colors[i]
          };
        });
    }
  }
}
