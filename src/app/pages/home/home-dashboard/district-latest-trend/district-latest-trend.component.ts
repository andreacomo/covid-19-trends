import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { LinearChartProvider } from 'src/app/commons/services/linear-chart-provider';
import { ChartDataType } from 'src/app/commons/components/line-chart/line-chart.component';
import { EnrichedDistrict } from '../../models/enriched-district';

@Component({
  selector: 'app-district-latest-trend',
  templateUrl: './district-latest-trend.component.html',
  styleUrls: ['./district-latest-trend.component.scss']
})
export class DistrictLatestTrendComponent implements OnInit, OnChanges {

  @Input()
  data: (DistrictData & EnrichedDistrict)[];

  chartData: ChartDataSets[];

  labels: Label[];

  availableChartTypes: ChartDataType[] = [{
    label: 'Casi totali',
    value: 'totale_casi',
    active: false,
    transformer: (values) => values.map(v => v.totale_casi),
    lineDash: []
  }];

  options: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    }
  };

  constructor(private linearChart: LinearChartProvider) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      const adaptedData = {key: this.data};
      this.chartData = this.linearChart.createChartData<DistrictData & EnrichedDistrict>(
        adaptedData,
        this.availableChartTypes[0]
      );

      this.labels = this.linearChart.createLabels<DistrictData & EnrichedDistrict>(adaptedData);
    }
  }
}
