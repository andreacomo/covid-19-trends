import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { LinearChartProvider } from 'src/app/commons/services/linear-chart-provider';
import { EnrichedData } from '../../models/enriched-data';
import { LinearChartDataTypeProvider } from 'src/app/commons/services/linear-chart-data-type-provider';
import { ChartDataType } from 'src/app/commons/models/chart-data-type';

@Component({
  selector: 'app-district-latest-trend',
  templateUrl: './district-latest-trend.component.html',
  styleUrls: ['./district-latest-trend.component.scss']
})
export class DistrictLatestTrendComponent implements OnInit, OnChanges {

  @Input()
  data: (DistrictData & EnrichedData)[];

  chartData: ChartDataSets[];

  labels: Label[];

  availableChartTypes: ChartDataType[];

  options: ChartOptions = {
    responsive: true,
    aspectRatio: 1.5,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        id: 'loose-labels',
        type: 'linear',
        position: 'left',
        ticks: {
          maxTicksLimit: 6
        }
      }]
    },
  };

  constructor(private linearChart: LinearChartProvider,
              private chartTypeProvider: LinearChartDataTypeProvider) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.isFirstChange()) {
      this.availableChartTypes = [this.chartTypeProvider.get('totale_casi')];
    }
    if (changes.data.currentValue) {
      const adaptedData = {};
      adaptedData[this.data[0].denominazione_regione] = this.data;

      this.chartData = this.linearChart.createChartData<DistrictData & EnrichedData>(
        adaptedData,
        this.availableChartTypes[0],
        {
          yAxisID: 'loose-labels',
          lineTension: 0.1
        }
      );

      this.labels = this.linearChart.createLabels<DistrictData & EnrichedData>(adaptedData);
    }
  }
}
