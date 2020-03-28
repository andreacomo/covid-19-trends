import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { LinearChartProvider } from 'src/app/commons/services/linear-chart-provider';
import { LocalDataService } from '../../services/local-data.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {

  @Input()
  chartData: ChartDataSets[];

  @Input()
  labels: Label[];

  @Input()
  chartTypes: ChartDataType[];

  @Output()
  toggleDataType: EventEmitter<ChartDataType> = new EventEmitter<ChartDataType>();

  options: ChartOptions;

  plugins: any[];

  private previousMediaQuery: string;

  private watcher: Subscription;

  @ViewChild(BaseChartDirective, { static: false })
  chart: BaseChartDirective;

  constructor(private dataService: LocalDataService,
              private chartProvider: LinearChartProvider,
              private mediaObserver: MediaObserver) { }

  ngOnInit() {
    this.plugins = this.chartProvider.getPlugins();

    this.dataService.getMilestones()
      .subscribe(m => {
        this.options = this.chartProvider.getOptions(m);
      });

    this.watcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' && this.previousMediaQuery === 'md' && this.chartData) {
        this.chartProvider.switchToThinLines(this.chartData);
      } else if (change.mqAlias === 'md' && this.previousMediaQuery === 'sm' && this.chartData) {
        this.chartProvider.switchToDefaultLines(this.chartData);
      }
      this.previousMediaQuery = change.mqAlias;
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
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
