import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { WorldVaccinationStatus } from '../../models/world-vaccination-status';
import { FieldBasedWorldVaccinationDataFilter } from '../../services/world-vaccination-data-filter';
import { Colors } from 'src/app/commons/models/colors';
import { CountryVaccinationStatus } from '../../models/country-vaccination-status';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-countries-top-status-chart',
  templateUrl: './countries-top-status-chart.component.html',
  styleUrls: ['./countries-top-status-chart.component.scss']
})
export class CountriesTopStatusChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  data: WorldVaccinationStatus[];

  options: ChartOptions;

  labels: Label[];

  chartData: ChartDataSets[];

  countriesNumber: number;

  watchMedia: Subscription;

  constructor(private media: MediaObserver) {
    this.countriesNumber = 10;
    this.options = {
      responsive: true,
      aspectRatio: 1,
      legend: {
        display: true,
        position: 'top',
        align: 'center',
        labels: {
        boxWidth: 13,
        fontFamily: 'Roboto, \'Helvetica Neue\', sans-serif'
        }
      },
      tooltips: {
          enabled: true,
          callbacks: {
            label: (item: ChartTooltipItem, data: ChartData) => {
              return parseInt(item.value, 10).toLocaleString();
            }
          }
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: (value, index, values) => {
              const million = value as number / 1000000;
              return million + ' Mln';
            }
          }
        }]
      },
      plugins: {
        datalabels: {
          font: {
            weight: 'bold'
          },
          anchor: 'end',
          align: 'end',
          clamp: true,
          formatter: (value, ctx) => {
            return parseInt(value, 10).toLocaleString();
          }
        }
      }
    };

    this.watchMedia = this.media.asObservable().pipe(
      map(changes => changes[0]),
      distinctUntilChanged((c1, c2) => c1.mqAlias === c2.mqAlias)
    )
    .subscribe((change: MediaChange) => this.resetAspectRatio());
   }

   ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      const field = 'totalVaccinations';
      const countryWithMaxFieldValue = new FieldBasedWorldVaccinationDataFilter(field, this.countriesNumber).filter(this.data);

      this.labels = countryWithMaxFieldValue.map(c => c.countryName);
      const colors = [...Colors.SUPPORTED];
      this.chartData = [{
        data: countryWithMaxFieldValue.map(c => this.getFieldValue(field, c)),
        backgroundColor: colors,
        borderColor: colors,
        hoverBackgroundColor: colors.map(c => c + 'DD')
      }];
    }
  }

  ngOnDestroy(): void {
    this.watchMedia.unsubscribe();
  }

  private getFieldValue(fieldName: string, c: CountryVaccinationStatus): number {
    return c[fieldName];
  }

  private resetAspectRatio() {
    if (this.media.isActive('sm') || this.media.isActive('lt-sm')) {
      this.options = {
        ...this.options,
        aspectRatio: 2
      };
    } else {
      this.options = {
        ...this.options,
        aspectRatio: 1
      };
    }
  }
}
