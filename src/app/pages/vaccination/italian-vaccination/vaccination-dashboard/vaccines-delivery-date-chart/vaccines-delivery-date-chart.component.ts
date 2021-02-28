import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartTooltipItem } from 'chart.js';
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

  chartData: ChartDataSets[];

  labels: Label[];

  timeFilter: TimeFilter;

  private allDates: Date[];

  constructor(private dataFilterProvider: DataFilterProviderService) {
    this.timeFilter = this.dataFilterProvider.getTimeFilterByScope('all');
    this.allDates = this.generateDateRange();
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
        lineTension: 0.1,
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
