import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NationalData } from 'src/app/commons/models/national-data';
import { ChartOptions, ChartDataSets, ChartTooltipItem, ChartData } from 'chart.js';
import { Label } from 'ng2-charts';
import { DateStringPipe } from 'src/app/commons/pipes/date-string.pipe';
import { Colors } from 'src/app/commons/models/colors';

@Component({
  selector: 'app-national-data-chart',
  templateUrl: './national-data-chart.component.html',
  styleUrls: ['./national-data-chart.component.scss']
})
export class NationalDataChartComponent implements OnInit, OnChanges {

  @Input()
  data: NationalData[];

  @Input()
  config: ChartConfig;

  options: ChartOptions = {
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
      enabled: true,
      callbacks: {
        label: (item: ChartTooltipItem, data: ChartData) => {
          const valueAsFloat = parseFloat(item.value);
          const value: string = valueAsFloat % 1 === 0 ? item.value : valueAsFloat.toFixed(2);
          return `${data.datasets[item.datasetIndex].label}: ${value}${this.config.isPercentage ? '%' : ''}`;
        }
      }
    }
  };

  labels: Label[];

  chartData: ChartDataSets[];

  constructor(private dateString: DateStringPipe) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      const latestData = this.data.slice(this.data.length - this.config.dataLatestDays);
      this.chartData = [{
          label: this.config.dataLabel,
          data: latestData.map(d => d[this.config.metric]),
          barPercentage: .6,
          backgroundColor: `${this.config.dataBarColor}AA`,
          hoverBackgroundColor: this.config.dataBarColor,
          borderColor: this.config.dataBarColor
        }, {
          label: this.config.smaLabel,
          data: this.createSimpleMovingAverage(latestData, this.config.smaWindow, this.config.metric),
          type: 'line',
          fill: false,
          borderWidth: 2,
          pointRadius: 2,
          backgroundColor: Colors.SUPPORTED[Colors.SUPPORTED.length - 2],
          borderColor: Colors.SUPPORTED[Colors.SUPPORTED.length - 2]
        }];
      this.labels = latestData.map(d => this.dateString.transform(d.data));
    }
  }

  private createSimpleMovingAverage(data: NationalData[], window: number, field: string): number[] {
    const gap = Math.floor(window / 2);
    const result: number[] = Array(gap).fill(null);

    for (let i = 0; i < data.length - window; i++) {
      const sma = data.slice(i, i + window).reduce((acc, d) => {
        return acc + d[field];
      }, 0) / window;
      result.push(sma);
    }

    return result;
  }
}

export class ChartConfig {

  title: string;

  metric: string;

  dataLatestDays: number;

  dataLabel: string;

  dataBarColor: string;

  smaLabel: string;

  smaWindow: number;

  isPercentage?: boolean;
}
