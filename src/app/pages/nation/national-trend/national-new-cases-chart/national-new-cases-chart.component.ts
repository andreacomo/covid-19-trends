import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NationalData } from 'src/app/commons/models/national-data';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DateStringPipe } from 'src/app/commons/pipes/date-string.pipe';

@Component({
  selector: 'app-national-new-cases-chart',
  templateUrl: './national-new-cases-chart.component.html',
  styleUrls: ['./national-new-cases-chart.component.scss']
})
export class NationalNewCasesChartComponent implements OnInit, OnChanges {

  @Input()
  data: NationalData[];

  options: ChartOptions = {
    responsive: true,
    aspectRatio: 2
  };

  labels: Label[];

  chartData: ChartDataSets[];

  window: number;

  constructor(private dateString: DateStringPipe) { }

  ngOnInit() {
    this.window = 5;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      const latestData = this.data.slice(this.data.length - 40);
      this.chartData = [{
          label: 'Totale casi',
          data: latestData.map(d => d.nuovi_positivi),
          barPercentage: .6,
          backgroundColor: '#ff9800AA',
          hoverBackgroundColor: '#ff7b00'
        }, {
          label: `Media Mobile a ${window} giorni`,
          data: this.createSimpleMovingAverage(latestData, this.window, 'nuovi_positivi'),
          type: 'line',
          fill: false
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
