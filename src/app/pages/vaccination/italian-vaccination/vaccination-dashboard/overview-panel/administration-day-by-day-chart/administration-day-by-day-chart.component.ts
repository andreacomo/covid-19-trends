import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';
import { TimeFilter } from 'src/app/commons/models/time-filter';
import { ChartDataTypeDecorator } from 'src/app/commons/models/chart-data-type-decorator';
import { ChartDataType } from 'src/app/commons/models/chart-data-type';
import { DataFilterProviderService } from 'src/app/commons/services/data-filter-provider.service';
import { VaccinationPerDay } from '../../../models/vaccination-per-day';
import { DateStringPipe } from 'src/app/commons/pipes/date-string.pipe';
import { Numbers } from 'src/app/commons/models/numbers';
import ChartOptionsFactory from 'src/app/commons/services/chart-options.factory';

@Component({
  selector: 'app-administration-day-by-day-chart',
  templateUrl: './administration-day-by-day-chart.component.html',
  styleUrls: ['./administration-day-by-day-chart.component.scss']
})
export class AdministrationDayByDayChartComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinationPerDay[];

  options: ChartOptions;

  chartData: ChartDataSets[];

  labels: Label[];

  timeFilter: TimeFilter;

  chartTypeDecorator: AdaptableChartDataTypeDecorator;

  availableDecorators: AdaptableChartDataTypeDecorator[];

  constructor(private dataFilterProvider: DataFilterProviderService,
              private dateString: DateStringPipe) {
    this.timeFilter = this.dataFilterProvider.getTimeFilterByScope('all');
    this.availableDecorators = [
      new AsIsChartDataTypeAdapter('Somministrazioni giornaliere', 'stacked_line_chart', false),
      new TrendChartDataTypeAdapter('Trend somministrazioni', 'signal_cellular_alt', false)
    ];
    this.chartTypeDecorator = this.availableDecorators[0];

    this.options = {
      ...ChartOptionsFactory.createDefault(),
      tooltips: {
        enabled: true,
        mode: 'label',
        callbacks: {
          label: (item: ChartTooltipItem, data: ChartData) => {
            return `${data.datasets[item.datasetIndex].label}: ${Numbers.beautifyWithSeparators(item.value)}`;
          },
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: (value, index, values) => {
              return Numbers.beautifyZeroesAsText(value as number);
            }
          }
        }]
      }
    };
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      this.initDataSet();
    }
  }

  applyTimeFilter(filter: TimeFilter) {
    this.timeFilter = filter;
    this.initDataSet();
  }

  changeChartType(chartType: AdaptableChartDataTypeDecorator) {
    this.chartTypeDecorator = chartType;
    this.initDataSet();
  }

  private initDataSet() {
    this.labels = this.timeFilter.apply(this.data).map(d => this.dateString.transform(d.day));

    this.chartData = [
      this.createChartData('Secondo booster', this.data, 'booster2', Colors.DOSE_4),
      this.createChartData('Primo booster', this.data, 'booster1', Colors.DOSE_3),
      this.createChartData('Dosi a guariti', this.data, 'afterHealing', Colors.DOSE_AH),
      this.createChartData('Seconda dose', this.data, 'second', Colors.DOSE_2),
      this.createChartData('Prima dose', this.data, 'first', Colors.DOSE_1),
      this.restyleLine(this.createChartData('Dosi totali', this.data, 'total', Colors.SUPPORTED[19]))
    ];
  }

  private restyleLine(chartData: ChartDataSets): ChartDataSets {
    return {
      ...chartData,
      fill: false,
      pointBorderWidth: 1.5,
      pointRadius: 2.5,
      borderWidth: 1.5,
    };
  }

  private createChartData(label: string, data: VaccinationPerDay[], attribute: string, colour: string): ChartDataSets {
    return {
      data: this.timeFilter.apply(this.chartTypeDecorator.adapt(data.map(d => d.doses[attribute]), [])),
      label,
      borderWidth: 2,
      borderColor: colour,
      backgroundColor: colour + 'AA',
      pointBorderColor: colour,
      pointBackgroundColor: colour,
      pointHoverBorderColor: colour,
      pointBorderWidth: 2,
      pointRadius: 2.5
    };
  }
}

/**
 * just to make adapt public
 */
abstract class AdaptableChartDataTypeDecorator extends ChartDataTypeDecorator {

  public abstract adapt(transformedValues: number[], originalValues: any[]): number[];

}

class TrendChartDataTypeAdapter extends AdaptableChartDataTypeDecorator {

  public adapt(transformedValues: number[], originalValues: any[]): number[] {
      let accumulator = 0;
      return transformedValues
          .map(v => accumulator += v);
  }

}

class AsIsChartDataTypeAdapter extends AdaptableChartDataTypeDecorator {

  public adapt(transformedValues: number[], originalValues: any[]): number[] {
      return transformedValues;
  }

}
