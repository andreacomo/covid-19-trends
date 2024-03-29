import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { VaccinesDeliveryPerSupplierInDistricts } from '../../../models/vaccines-delivery-per-supplier-in-districts';
import { Numbers } from 'src/app/commons/models/numbers';
import { Colors } from 'src/app/commons/models/colors';
import ChartOptionsFactory from 'src/app/commons/services/chart-options.factory';

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
      ...ChartOptionsFactory.createDefault(),
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            callback: (value, index, values) => {
              return Numbers.beautifyZeroesAsText(value as number);
            }
          }
        }],
        yAxes: [{
          stacked: true
        }]
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: (item: ChartTooltipItem, data: ChartData) => {
            return `${data.datasets[item.datasetIndex].label}: ${Numbers.beautifyWithSeparators(item.value)}`;
          },
        }
      }
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      const colors = [...Colors.SUPPORTED].reverse().slice(4);
      this.labels = this.data[0].deliveries.map(d => d.districtName);
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
