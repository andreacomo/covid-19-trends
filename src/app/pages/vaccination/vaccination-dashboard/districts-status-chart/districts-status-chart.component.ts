import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';
import { VaccinationDistrictStatus } from '../../models/vaccination-district-status';

@Component({
  selector: 'app-districts-status-chart',
  templateUrl: './districts-status-chart.component.html',
  styleUrls: ['./districts-status-chart.component.scss']
})
export class DistrictsStatusChartComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinationDistrictStatus[];

  options: ChartOptions;

  labels: Label[];

  chartData: ChartDataSets[];

  constructor() { }

  ngOnInit(): void {
    this.options = this.createOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      this.init(changes.data.currentValue);
    }
  }

  private createOptions(): ChartOptions {
    return {
      responsive: true,
      aspectRatio: 3,
      scales: {
        xAxes: [{
          ticks: {
            min: 0,
            max: 100
          }
        }]
      },
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
        enabled: true,
        callbacks: {
          label: (item: ChartTooltipItem, data: ChartData) => {
            return parseFloat(item.value).toFixed(2) + '%';
          },
          footer: (items: ChartTooltipItem[], data: ChartData) => {
            const item = items[0];
            const status = this.data[item.index];
            return `Somministrazioni: ${status.doneCount.toLocaleString()}\nDosi consegnate: ${status.receivedCount.toLocaleString()}`;
          }
        }
      },
    };
  }

  private init(data: VaccinationDistrictStatus[]): void {
    this.labels = data.map(d => d.districtName);
    this.chartData = [{
      label: '% dosi somministrate / dosi consegnate',
      data: data.map(d => d.completionPercentage * 100),
      backgroundColor: Colors.SUPPORTED.map(c => c + '66'),
      borderColor: Colors.SUPPORTED,
      hoverBackgroundColor: Colors.SUPPORTED.map(c => c + 'AA'),
      hoverBorderColor: Colors.SUPPORTED,
      borderWidth: 1
    }];
  }
}
