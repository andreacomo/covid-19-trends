import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-line-chart-legend',
  templateUrl: './line-chart-legend.component.html',
  styleUrls: ['./line-chart-legend.component.scss']
})
export class LineChartLegendComponent implements OnInit {

  @Input()
  updatedOn: Date;

  constructor() { }

  ngOnInit() {
  }

}
