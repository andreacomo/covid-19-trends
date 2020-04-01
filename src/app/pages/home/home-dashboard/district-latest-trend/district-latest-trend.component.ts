import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';
import { DistrictData } from 'src/app/commons/models/district-data';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DistrictLatestProviderService } from '../../services/district-latest-provider.service';
import { DateStringPipe } from 'src/app/commons/pipes/date-string.pipe';
import { LinearChartProvider } from 'src/app/commons/services/linear-chart-provider';
import { ChartDataType } from 'src/app/commons/components/line-chart/line-chart.component';

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

  constructor(private dataProvider: DistrictLatestProviderService,
              private dateString: DateStringPipe,
              private linearChart: LinearChartProvider) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      /*
      const chartData = this.dataProvider.createData(this.data);
      const meanData = this.dataProvider.createMeanData(chartData);

      const barData = Object.entries(chartData)
          .filter(([code]) => code === 'Lombardia')
          .map(([code, values]) => {
            return {
              label: code,
              data: (values as any[]).map(v => v.diff_casi)
            };
          });

      this.chartData = barData;

      this.labels = (Object.entries(chartData)[0][1] as any[]).map(v => this.dateString.transform(v.data));
      */
      const data = this.dataProvider.createData({lomb: this.data.Abruzzo});
      this.chartData = this.linearChart.createChartData<DistrictData>(
          data,
          this.availableChartTypes[0]
      );

      this.labels = this.linearChart.createLabels<DistrictData>(data);
    }
  }
}
