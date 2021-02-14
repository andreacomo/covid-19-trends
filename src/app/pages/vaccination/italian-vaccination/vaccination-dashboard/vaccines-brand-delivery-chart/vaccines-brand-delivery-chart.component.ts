import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { VaccinesDeliveryPerSupplierInDistricts } from '../../models/vaccines-delivery-per-supplier-in-districts';
import { Colors } from 'src/app/commons/models/colors';

@Component({
  selector: 'app-vaccines-brand-delivery-chart',
  templateUrl: './vaccines-brand-delivery-chart.component.html',
  styleUrls: ['./vaccines-brand-delivery-chart.component.scss']
})
export class VaccinesBrandDeliveryChartComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinesDeliveryPerSupplierInDistricts[];

  options: ChartOptions;

  plugins: any[];

  labels: Label[];

  chartData: ChartDataSets[];

  constructor() {
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
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: (item: ChartTooltipItem, data: ChartData) => {
            return `${data.datasets[item.datasetIndex].label}: ${parseInt(item.value, 10).toLocaleString()}`;
          },
        }
      }
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      this.labels = this.data[0].deliveries.map(d => d.districtName);
      const colors = [Colors.SUPPORTED[1], Colors.SUPPORTED[2], Colors.SUPPORTED[4]];
      this.chartData = this.data.map((d, i) => ({
        data: d.deliveries.map(delivery => delivery.doses),
        backgroundColor: colors[i] + 'AA',
        borderColor: colors[i] + 'AA',
        hoverBackgroundColor: colors[i],
        hoverBorderColor: colors[i],
        label: d.supplier
      }));
    }
  }
}
