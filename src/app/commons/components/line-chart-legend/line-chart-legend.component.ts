import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartDataType } from '../../models/chart-data-type';

@Component({
  selector: 'app-line-chart-legend',
  templateUrl: './line-chart-legend.component.html',
  styleUrls: ['./line-chart-legend.component.scss']
})
export class LineChartLegendComponent implements OnInit {

  @Input()
  chartDataTypes: ChartDataType[];

  @Output()
  toggleDataType: EventEmitter<ChartDataType> = new EventEmitter<ChartDataType>();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  toggle(chartDataType: ChartDataType) {
    const countActive = this.chartDataTypes
                  .filter(c => c.active)
                  .length;
    if (countActive < 4 || chartDataType.active) {
      this.toggleDataType.next({...chartDataType, active: !chartDataType.active});
    } else {
      this.snackBar.open('Spiacente, al massimo 4 grafici');
    }
  }
}
