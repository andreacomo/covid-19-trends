import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { LinearChartProvider } from 'src/app/commons/services/linear-chart-provider';
import { LocalDataService } from '../../services/local-data.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { TimeFilter } from '../../models/time-filter';
import { ChartDataType } from '../../models/chart-data-type';
import { ChartDataTypeDecorator } from '../../models/chart-data-type-decorator';

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

  @Input()
  timeFilter: TimeFilter;

  @Input()
  valuesDecorator: ChartDataTypeDecorator;

  @Input()
  availableDecorators: ChartDataTypeDecorator[];

  @Output()
  toggleDataType: EventEmitter<ChartDataType> = new EventEmitter<ChartDataType>();

  @Output()
  timeFilterChange: EventEmitter<TimeFilter> = new EventEmitter<TimeFilter>();

  @Output()
  valuesDecoratorChange: EventEmitter<ChartDataTypeDecorator> = new EventEmitter<ChartDataTypeDecorator>();

  options: ChartOptions;

  plugins: any[];

  private previousMediaQuery: string;

  private watcher: Subscription;

  @ViewChild(BaseChartDirective)
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
      if (change.mqAlias === 'sm' && this.isBig(this.previousMediaQuery) && this.chartData) {
        this.chartProvider.switchToThinLines(this.chartData);
      } else if (this.isBig(change.mqAlias) && this.was('sm') && this.chartData) {
        this.chartProvider.switchToDefaultLines(this.chartData);
      }
      this.previousMediaQuery = change.mqAlias;
    });
  }

  private isBig(alias: string) {
    return ['md', 'lg', 'xl'].indexOf(alias) !== -1;
  }

  private was(alias: string) {
    return this.previousMediaQuery === alias;
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

  applyTimeFilter(filter: TimeFilter) {
    this.timeFilterChange.next(filter);
  }

  applyDecorator(decorator: ChartDataTypeDecorator) {
    this.valuesDecoratorChange.next(decorator);
  }
}


