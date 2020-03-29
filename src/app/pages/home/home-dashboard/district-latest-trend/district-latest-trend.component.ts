import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';
import { DistrictData } from 'src/app/commons/models/district-data';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-district-latest-trend',
  templateUrl: './district-latest-trend.component.html',
  styleUrls: ['./district-latest-trend.component.scss']
})
export class DistrictLatestTrendComponent implements OnInit, OnChanges {

  @Input()
  data: {[name: string]: DistrictData[]};

  chartData: ChartDataSets[];

  labels: Label[];

  constructor(private github: GithubService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      const chartData = Object.keys(this.data).reduce((ret, key) => {
        ret[key] = this.createDiffWithPreviousDay(this.data[key]);
        return ret;
      }, {});

      const barData = Object.entries(chartData)
          .filter(([code]) => code)
          .map(([code, values]) => {
            return {
              label: code,
              data: (values as any[]).map(v => v.diff_casi)
            };
          });

      /*
      const lineData = barData.map(d => {
        return {
          ...d,
          fill: false,
          type: 'line'
        };
      });
      */
      this.chartData = barData;

      this.labels = (Object.entries(chartData)[0][1] as any[]).map(v => v.data);
    }
  }

  private createDiffWithPreviousDay(values: DistrictData[]): (DistrictData & {diff_casi: number, diff_casi_percent: number})[] {
    const latestValues = values.slice(values.length - 4);
    let index = 0;
    return latestValues
      .map(v => {
        if (index > 0) {
          const current = latestValues[index].totale_casi;
          const previous = latestValues[index - 1].totale_casi;
          const newValue = {
            ...v,
            diff_casi: current - previous,
            diff_casi_percent: ((current - previous) / previous) * 100
          };
          index++;
          return newValue;
        } else {
          index++;
          return null;
        }
      })
      .filter(v => v != null);
  }
}
