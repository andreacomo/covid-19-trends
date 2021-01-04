import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';
import { VaccinationDistrictStatus } from '../../models/vaccination-district-status';

@Component({
  selector: 'app-districts-status',
  templateUrl: './districts-status.component.html',
  styleUrls: ['./districts-status.component.scss']
})
export class DistrictsStatusComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinationDistrictStatus[];

  options: ChartOptions = {
    responsive: true,
    aspectRatio: 3,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 100
        }
      }]
    }
  };

  labels: Label[];

  chartData: ChartDataSets[];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      this.init(changes.data.currentValue);
    }
  }

  private init(data: VaccinationDistrictStatus[]): void {
    this.labels = data.map(d => d.districtName);
    this.chartData = [{
      data: data.map(d => d.completionPercentage * 100),
      backgroundColor: Colors.SUPPORTED.map(c => c + '66'),
      borderColor: Colors.SUPPORTED,
      hoverBackgroundColor: Colors.SUPPORTED.map(c => c + 'AA'),
      hoverBorderColor: Colors.SUPPORTED,
      borderWidth: 1
    }];
  }

}
