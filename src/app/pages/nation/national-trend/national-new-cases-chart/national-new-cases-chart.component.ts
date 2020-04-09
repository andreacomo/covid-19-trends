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

  constructor(private dateString: DateStringPipe) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      const latestData = this.data.slice(this.data.length - 30);
      let index = 1;
      this.chartData = [{
          label: 'Totale casi',
          data: latestData.map(d => d.nuovi_positivi),
          // barPercentage: .4,
          backgroundColor: '#ff9800AA',
          hoverBackgroundColor: '#ff7b00'
        }];
      this.labels = latestData.map(d => this.dateString.transform(d.data));
    }
  }
}
