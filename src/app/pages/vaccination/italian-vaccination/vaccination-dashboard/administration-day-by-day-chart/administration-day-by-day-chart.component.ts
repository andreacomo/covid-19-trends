import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';
import { TimeFilter } from 'src/app/commons/models/time-filter';
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

  private allDates: Date[];

  constructor(private dataFilterProvider: DataFilterProviderService) {
    this.timeFilter = this.dataFilterProvider.getTimeFilterByScope('all');
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
    const filteredData = this.timeFilter.apply(this.data);
    this.labels = filteredData.map(d => d.day.replace('T00:00:00.000Z', ''));

    this.chartData = [
      this.createChartData('Seconda dose', filteredData, 'second', Colors.SUPPORTED[15]),
      this.createChartData('Prima dose', filteredData, 'first', Colors.SUPPORTED[2])
    ];
  }

  private createChartData(label: string, filteredData: VaccinationPerDay[], attribute: string, colour: string): ChartDataSets {
    return {
      data: filteredData.map(d => d.doses[attribute]),
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
