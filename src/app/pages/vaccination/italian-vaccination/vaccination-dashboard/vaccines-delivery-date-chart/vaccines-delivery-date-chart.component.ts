import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { TimeFilter } from 'src/app/commons/models/time-filter';
import { DataFilterProviderService } from 'src/app/commons/services/data-filter-provider.service';
import { VaccineSupplierColors } from '../../models/vaccine-supplier-colors';
import { SupplierDelivery, VaccinesDeliveryDatesPerSupplier } from '../../models/vaccines-delivery-dates-per-supplier';

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

  constructor(private dataFilterProvider: DataFilterProviderService) {
    this.timeFilter = this.dataFilterProvider.getTimeFilterByScope('all');
    this.allDates = this.generateDateRange();
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
      const color = VaccineSupplierColors.SUPPORTED[i];
      return {
        data: dates.map(date => dateDosesMap[date] || 0),
        /* fill: false,
        backgroundColor: color + 'AA',
        borderColor: color + 'AA',
        hoverBackgroundColor: color,
        hoverBorderColor: color, */
        borderWidth: 2,
        lineTension: 0.1,
        pointRadius: 4,
        pointBorderWidth: 2,
        label: d.supplier,
        tooltipFooter: (items: ChartTooltipItem[], data: ChartData) => ''
      };
    });
  }

  private createDateDosesMap(deliveries: SupplierDelivery[]) {
    return deliveries.reduce((acc, item) => {
      const timeStamp = this.stripTime(item.date);
      acc[timeStamp] = acc[timeStamp] || item.doses;
      return acc;
    }, {});
  }

  private stripTime(timeStamp: string): string {
    return timeStamp.replace(/T00:00:00.000Z/, '');
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
