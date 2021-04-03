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
import { Category, GoogeAnalyticsService } from '../../services/googe-analytics.service';

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
  chartTypes: ChartDataType[];

  @Input()
  timeFilter: TimeFilter;

  @Input()
  valuesDecorator: ChartDataTypeDecorator;

  @Input()
  availableDecorators: ChartDataTypeDecorator[];

  @Input()
  options: ChartOptions;

  @Input()
  trackingEventPrefix: string;

  @Output()
  toggleDataType: EventEmitter<ChartDataType> = new EventEmitter<ChartDataType>();

  @Output()
  timeFilterChange: EventEmitter<TimeFilter> = new EventEmitter<TimeFilter>();

  @Output()
  valuesDecoratorChange: EventEmitter<ChartDataTypeDecorator> = new EventEmitter<ChartDataTypeDecorator>();

  plugins: any[];

  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;

  constructor(private dataService: LocalDataService,
              private chartProvider: LinearChartProvider,
              private googleAnalytics: GoogeAnalyticsService) { }

  ngOnInit() {
    this.plugins = this.chartProvider.getPlugins();

    this.dataService.getMilestones()
      .subscribe(m => {
        this.options = this.options || this.chartProvider.getOptions(m);
      });
  }

  hideDataset(chartIndex: number, value: boolean) {
    this.chart.hideDataset(chartIndex, value);
  }

  toggle(dataType: ChartDataType) {
    this.toggleDataType.next(dataType);

    if (this.trackingEventPrefix) {
      this.googleAnalytics.emitEvent(
        `${this.trackingEventPrefix}_switch_chart_type_${dataType.value}`,
        dataType.label,
        Category.CHART_TYPE_SWITCH
      );
    }
  }

  applyTimeFilter(filter: TimeFilter) {
    this.timeFilterChange.next(filter);

    if (this.trackingEventPrefix) {
      this.googleAnalytics.emitEvent(
        `${this.trackingEventPrefix}_switch_filter_${filter.scope}`,
        filter.label,
        Category.CHART_TYPE_SWITCH
      );
    }
  }

  applyDecorator(decorator: ChartDataTypeDecorator) {
    this.valuesDecoratorChange.next(decorator);
  }
}


