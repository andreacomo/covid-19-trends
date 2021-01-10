import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Colors } from 'src/app/commons/models/colors';
import { VaccinationDistrictOverallStatus } from '../../models/vaccination-district-overall-status';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-overall-status-chart',
  templateUrl: './overall-status-chart.component.html',
  styleUrls: ['./overall-status-chart.component.scss']
})
export class OverallStatusChartComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinationDistrictOverallStatus;

  options: ChartOptions;

  colors: any[];

  plugins: any[];

  labels: Label[];

  chartData: number[];

  constructor(private media: MediaObserver) {
    this.plugins = [pluginDataLabels];
    this.options = {
      responsive: true,
      aspectRatio: 1,
      legend: {
          display: true,
          position: 'top',
          align: 'center',
          labels: {
          boxWidth: 20,
          fontFamily: 'Roboto, \'Helvetica Neue\', sans-serif'
        }
      },
      tooltips: {
          enabled: false
      },
      plugins: {
        datalabels: {
          color: '#FFF',
          font: {
            weight: 'bold'
          },
          formatter: (value, ctx) => {
            return parseInt(value, 10).toLocaleString();
          },
        },
      }
    };
    this.colors = [{
      borderColor: [Colors.SUPPORTED[18], Colors.SUPPORTED[16]],
      backgroundColor: [Colors.SUPPORTED[18], Colors.SUPPORTED[16]]
    }];

    this.media.asObservable().pipe(
        map(changes => changes[0]),
        distinctUntilChanged((c1, c2) => c1.mqAlias === c2.mqAlias)
      )
      .subscribe((change: MediaChange) => this.resetAspectRatio());
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      this.labels = ['Dosi somministrate', 'Dosi mancanti'];
      this.chartData = [this.data.doneCount, this.data.receivedCount - this.data.doneCount];
    }
  }

  private resetAspectRatio() {
    if (this.media.isActive('sm') || this.media.isActive('lt-sm')) {
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
