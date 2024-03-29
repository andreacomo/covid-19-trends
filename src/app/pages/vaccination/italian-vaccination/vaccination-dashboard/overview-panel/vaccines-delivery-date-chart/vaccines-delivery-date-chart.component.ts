import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { Numbers } from 'src/app/commons/models/numbers';
import { TimeFilter } from 'src/app/commons/models/time-filter';
import { DateStringPipe } from 'src/app/commons/pipes/date-string.pipe';
import ChartOptionsFactory from 'src/app/commons/services/chart-options.factory';
import { DataFilterProviderService } from 'src/app/commons/services/data-filter-provider.service';
import { SupplierDelivery, VaccinesDeliveryDatesPerSupplier } from '../../../models/vaccines-delivery-dates-per-supplier';

@Component({
  selector: 'app-vaccines-delivery-date-chart',
  templateUrl: './vaccines-delivery-date-chart.component.html',
  styleUrls: ['./vaccines-delivery-date-chart.component.scss']
})
export class VaccinesDeliveryDateChartComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinesDeliveryDatesPerSupplier[];

  options: ChartOptions;

  chartData: ChartDataSets[];

  labels: Label[];

  timeFilter: TimeFilter;

  private allDates: Date[];

  constructor(private dataFilterProvider: DataFilterProviderService,
              private dateString: DateStringPipe) {
    this.timeFilter = this.dataFilterProvider.getTimeFilterByScope('all');
    this.allDates = this.generateDateRange();
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

  private initDataSet() {
    const dates = this.timeFilter.apply(this.allDates)
      .map(d => {
        const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return `${year}-${month}-${day}`;
      });

    this.labels = dates;

    this.chartData = this.data.map((d, i) => {
      const dateDosesMap = this.createDateDosesMap(d.deliveries);
      const color = [
        '#FF6384',
        '#36A2EC',
        '#FFCE57',
        '#24e2b6',
        '#5358ed'
      ];
      return {
        data: dates.map(date => dateDosesMap[date] || 0),
        backgroundColor: color[i] + '66',
        borderColor: color[i] + 'AA',
        hoverBackgroundColor: color[i],
        hoverBorderColor: color[i],
        pointBackgroundColor: color[i],
        pointBorderColor: color[i],
        borderWidth: 2,
        lineTension: 0.1,
        pointRadius: 2,
        pointBorderWidth: 1,
        label: d.supplier,
        tooltipFooter: (items: ChartTooltipItem[], data: ChartData) => ''
      };
    });
  }

  private createDateDosesMap(deliveries: SupplierDelivery[]) {
    return deliveries.reduce((acc, item) => {
      const timeStamp = this.dateString.transform(item.date);
      acc[timeStamp] = acc[timeStamp] || item.doses;
      return acc;
    }, {});
  }

  private generateDateRange(): Date[] {
    const result = [];
    const dt = new Date('2020-12-27');

    while (dt <= new Date()) {
      result.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return result;
  }
}
