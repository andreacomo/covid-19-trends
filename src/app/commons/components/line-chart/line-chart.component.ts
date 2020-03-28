import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { LinearChartProvider } from 'src/app/commons/services/linear-chart-provider';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input()
  chartData: ChartDataSets[];

  @Input()
  labels: Label[];

  @Input()
  updatedOn: Date;

  @Input()
  chartTypes: ChartDataType[];

  @Output()
  toggleDataType: EventEmitter<ChartDataType> = new EventEmitter<ChartDataType>();

  options: ChartOptions;

  plugins: any[];

  @ViewChild(BaseChartDirective, { static: false })
  chart: BaseChartDirective;

  constructor(private dataService: LocalDataService) { }

  ngOnInit() {
    this.plugins = LinearChartProvider.getPlugins();
    this.dataService.getMilestones()
      .subscribe(m => {
        this.options = LinearChartProvider.getOptions(m);
      });
  }

  hideDataset(chartIndex: number, value: boolean) {
    this.chart.hideDataset(chartIndex, value);
  }

  toggle(dataType: ChartDataType) {
    this.toggleDataType.next(dataType);
  }
}

export class ChartDataType {
  label: string;
  value: string;
  active: boolean;
  transformer: (values: any[]) => any;
  lineDash: number[];
}
