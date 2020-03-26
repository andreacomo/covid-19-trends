import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
}
