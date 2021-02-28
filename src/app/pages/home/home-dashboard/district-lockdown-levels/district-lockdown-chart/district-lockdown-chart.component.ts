import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Regulation } from 'src/app/commons/models/districts-lockdown-colors';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-district-lockdown-chart',
  templateUrl: './district-lockdown-chart.component.html',
  styleUrls: ['./district-lockdown-chart.component.scss']
})
export class DistrictLockdownChartComponent implements OnInit, OnChanges {

  @Input()
  regulations: Regulation[];

  options: ChartOptions;

  plugins: any[];

  labels: Label[];

  chartData: ChartDataSets[];

  colors = {
    WHITE: '#fff',
    DARK_WHITE: '#efefef',
    YELLOW: '#fff704',
    DARK_YELLOW: '#ffe004',
    ORANGE: '#ffa500',
    DARK_ORANGE: '#ff9900',
    RED: '#ff4700',
    DARK_RED: '#ff1800'
  };

  constructor() {
    this.plugins = [pluginDataLabels];
    this.options = {
      responsive: true,
      aspectRatio: 2,
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
        enabled: false
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
          font: {
            weight: 'bold'
          }
        }
      }
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.regulations.isFirstChange()) {
      this.labels = this.regulations.map(r => r.validFromDate);
      this.chartData = [{
        data: this.getLengthOfColor('WHITE'),
        label: 'Bianco',
        ...this.getBarColor('WHITE')
       }, {
        data: this.getLengthOfColor('YELLOW'),
        label: 'Giallo',
        ...this.getBarColor('YELLOW')
      }, {
        data: this.getLengthOfColor('ORANGE'),
        label: 'Arancione',
        ...this.getBarColor('ORANGE')
      }, {
        data: this.getLengthOfColor('RED'),
        label: 'Rosso',
        ...this.getBarColor('RED')
      }];
    }
  }

  private getLengthOfColor(color: string) {
    return this.regulations.flatMap(r => r.scenarios
      .filter(s => s.color === color)
      .map(s => s.districts.length)
    );
  }

  private getBarColor(color: string) {
    return {
      borderWidth: 1,
      backgroundColor: this.colors[color],
      borderColor: this.colors[`DARK_${color}`],
      hoverBackgroundColor: this.colors[color],
      hoverBorderColor: this.colors[`DARK_${color}`]
    };
  }
}
