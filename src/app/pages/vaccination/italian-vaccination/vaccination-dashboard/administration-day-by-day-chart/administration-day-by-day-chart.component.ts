import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';
import { TimeFilter } from 'src/app/commons/models/time-filter';
import { ChartDataTypeDecorator } from 'src/app/commons/models/chart-data-type-decorator';
import { ChartDataType } from 'src/app/commons/models/chart-data-type';
import { DataFilterProviderService } from 'src/app/commons/services/data-filter-provider.service';
import { VaccinationPerDay } from '../../models/vaccination-per-day';

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

  constructor(private dataFilterProvider: DataFilterProviderService) {
    this.timeFilter = this.dataFilterProvider.getTimeFilterByScope('all');
    this.availableDecorators = [
      new AsIsChartDataTypeAdapter('Somministrazioni giornaliere', 'stacked_line_chart', false),
      new TrendChartDataTypeAdapter('Trend somministrazioni', 'signal_cellular_alt', false)
    ];
    this.chartTypeDecorator = this.availableDecorators[0];

    this.options = {
      responsive: true,
      aspectRatio: 2,
      legend: {
        display: true,
        position: 'top',
        align: 'center',
        labels: {
            fontFamily: 'Roboto, \'Helvetica Neue\', sans-serif'
        }
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: (item: ChartTooltipItem, data: ChartData) => {
            return `${data.datasets[item.datasetIndex].label}: ${parseInt(item.value, 10).toLocaleString()}`;
          },
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: (value, index, values) => {
              const thousand = value as number / 1000;
              return thousand + ' Mila';
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
    this.labels = this.timeFilter.apply(this.data).map(d => d.day.replace('T00:00:00.000Z', ''));

    this.chartData = [
      this.createChartData('Seconda dose', this.data, 'second', Colors.SUPPORTED[15]),
      this.createChartData('Prima dose', this.data, 'first', Colors.SUPPORTED[2])
    ];
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
