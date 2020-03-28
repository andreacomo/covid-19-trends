import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChartDataType } from '../line-chart/line-chart.component';

@Component({
  selector: 'app-line-chart-legend',
  templateUrl: './line-chart-legend.component.html',
  styleUrls: ['./line-chart-legend.component.scss']
})
export class LineChartLegendComponent implements OnInit {

  @Input()
  updatedOn: Date;

  @Input()
  chartDataTypes: ChartDataType[];

  @Output()
  toggleDataType: EventEmitter<ChartDataType> = new EventEmitter<ChartDataType>();

  constructor() { }

  ngOnInit() {
  }

  toggle(chartDataType: ChartDataType) {
    this.toggleDataType.next({...chartDataType, active: !chartDataType.active});
  }
}
