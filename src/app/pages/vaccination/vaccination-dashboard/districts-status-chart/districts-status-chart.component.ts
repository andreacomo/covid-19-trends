import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Colors } from 'src/app/commons/models/colors';
import { VaccinationDistrictStatus } from '../../models/vaccination-district-status';
import { VaccinationDistrictStatusSorter } from '../../models/vaccination-district-status-sorter';

@Component({
  selector: 'app-districts-status-chart',
  templateUrl: './districts-status-chart.component.html',
  styleUrls: ['./districts-status-chart.component.scss']
})
export class DistrictsStatusChartComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinationDistrictStatus[];

  options: ChartOptions;

  sorters: VaccinationDistrictStatusSorter[];

  selectedSorter: VaccinationDistrictStatusSorter;

  labels: Label[];

  chartData: ChartDataSets[];

  constructor() { }

  ngOnInit(): void {
    this.options = this.createOptions();
    this.sorters = this.createSorters();
    this.selectedSorter = this.sorters[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      this.init(changes.data.currentValue, this.selectedSorter);
    }
  }

  onSort(sorter: VaccinationDistrictStatusSorter): void {
    this.selectedSorter = sorter;
    this.labels = this.createLabels(this.data, sorter);
    this.chartData[0].data = this.createData(this.data, sorter);
  }

  private createOptions(): ChartOptions {
    return {
      responsive: true,
      aspectRatio: 2,
      scales: {
        xAxes: [{
          ticks: {
            min: 0,
            max: 100
          }
        }]
      },
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
            return parseFloat(item.value).toFixed(2) + '%';
          },
          footer: (items: ChartTooltipItem[], data: ChartData) => {
            const item = items[0];
            const status = this.data[item.index];
            return `Somministrazioni: ${status.doneCount.toLocaleString()}\nDosi consegnate: ${status.receivedCount.toLocaleString()}`;
          }
        }
      },
    };
  }

  private createSorters(): VaccinationDistrictStatusSorter[] {
    return [{
      icon: 'sort_by_alpha',
      label: 'Alfabetico',
      isSvg: false,
      sort: (v1, v2) => v1.districtName.localeCompare(v2.districtName)
    }, {
      icon: 'percent',
      label: 'Percentuale',
      isSvg: true,
      sort: (v1, v2) => v2.completionPercentage - v1.completionPercentage
    }, {
      icon: 'done',
      label: 'Somministrazioni',
      isSvg: false,
      sort: (v1, v2) => v2.doneCount - v1.doneCount
    }, {
      icon: 'local_shipping',
      label: 'Dosi consegnate',
      isSvg: false,
      sort: (v1, v2) => v2.receivedCount - v1.receivedCount
    }];
  }

  private init(data: VaccinationDistrictStatus[], sorter: VaccinationDistrictStatusSorter): void {
    this.labels = this.createLabels(data, sorter);
    this.chartData = [{
      label: '% dosi somministrate su dosi consegnate',
      data: this.createData(data, sorter),
      backgroundColor: Colors.SUPPORTED.map(c => c + '66'),
      borderColor: Colors.SUPPORTED,
      hoverBackgroundColor: Colors.SUPPORTED.map(c => c + 'AA'),
      hoverBorderColor: Colors.SUPPORTED,
      borderWidth: 1
    }];
  }

  private createLabels(data: VaccinationDistrictStatus[], sorter: VaccinationDistrictStatusSorter): string[] {
    return data.sort(sorter.sort).map(d => d.districtName);
  }

  private createData(data: VaccinationDistrictStatus[], sorter: VaccinationDistrictStatusSorter): number[] {
    return data.sort(sorter.sort).map(d => d.completionPercentage * 100);
  }
}
