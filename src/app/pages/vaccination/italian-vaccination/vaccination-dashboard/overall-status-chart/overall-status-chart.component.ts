import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { ChartData, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Colors } from 'src/app/commons/models/colors';
import { VaccinationDistrictOverallStatus } from '../../models/vaccination-district-overall-status';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';
import { VaccinationDoses } from '../../models/vaccination-doses';
import { Numbers } from 'src/app/commons/models/numbers';

@Component({
  selector: 'app-overall-status-chart',
  templateUrl: './overall-status-chart.component.html',
  styleUrls: ['./overall-status-chart.component.scss']
})
export class OverallStatusChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  data: VaccinationDistrictOverallStatus;

  @Input()
  totals: VaccinationDoses;

  options: ChartOptions;

  colors: any[];

  plugins: any[];

  labels: Label[];

  chartData: MultiDataSet;

  watchMedia: Subscription;

  constructor(private media: MediaObserver) {
    this.plugins = [pluginDataLabels];
    this.options = {
      responsive: true,
      aspectRatio: 1,
      cutoutPercentage: 30,
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        callbacks: {
          title: (item: ChartTooltipItem[], data: ChartData) => {
            return data.labels[item[0].datasetIndex][item[0].index];
          },
          label: (item: ChartTooltipItem, data: ChartData) => {
            return data.datasets[item.datasetIndex].data[item.index].toLocaleString();
          }
        }
      },
      plugins: {
        datalabels: {
          color: '#FFF',
          font: {
            weight: 'bold'
          },
          formatter: (value, ctx) => {
            return Numbers.beautifyWithSeparators(value);
          },
        },
      }
    };
    this.colors = [{
      borderColor: [Colors.SUPPORTED[18], Colors.SUPPORTED[16]],
      backgroundColor: [Colors.SUPPORTED[18], Colors.SUPPORTED[16]],
      hoverBorderColor: [Colors.SUPPORTED[18], Colors.SUPPORTED[16]],
      hoverBackgroundColor: [Colors.SUPPORTED[18], Colors.SUPPORTED[16]]
    }, {
      borderColor: [Colors.SUPPORTED[14], Colors.SUPPORTED[2]],
      backgroundColor: [Colors.SUPPORTED[14], Colors.SUPPORTED[2]],
      hoverBorderColor: [Colors.SUPPORTED[14], Colors.SUPPORTED[2]],
      hoverBackgroundColor: [Colors.SUPPORTED[14], Colors.SUPPORTED[2]]
    }];

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
      this.labels = [['Dosi somministrate', 'Dosi rimaste'], ['Prime somministrazioni', 'Seconde somministrazioni']];
      this.chartData = [
        [this.data.doneCount, this.data.receivedCount - this.data.doneCount],
        [this.totals.first, this.totals.second]
      ];
    }
  }

  ngOnDestroy(): void {
    this.watchMedia.unsubscribe();
  }

  private resetAspectRatio() {
    if (this.media.isActive('md') || this.media.isActive('lt-md')) {
      this.options = {
        ...this.options,
        aspectRatio: 1.5
      };
    } else {
      this.options = {
        ...this.options,
        aspectRatio: 1
      };
    }
  }
}
