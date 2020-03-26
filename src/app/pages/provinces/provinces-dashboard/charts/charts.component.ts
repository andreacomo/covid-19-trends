import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { LinearChartProvider } from '../../../../commons/services/linear-chart-provider';
import { LocalDataService } from 'src/app/commons/services/local-data.service';
import { Province } from 'src/app/commons/models/province';
import { LineChartComponent } from 'src/app/commons/components/line-chart/line-chart.component';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnChanges {

  @Input()
  district: string;

  @Input()
  toggleProvinces: Province[];

  chartData: ChartDataSets[];

  labels: Label[];

  @ViewChild('chart', { static: false })
  chart: LineChartComponent;

  constructor(private github: GithubService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.district != null && changes.district.currentValue) {
      this.github.getAllDataInDistrict(changes.district.currentValue)
        .subscribe(data => {
          this.chartData = LinearChartProvider.createChartData(data);

          this.labels = LinearChartProvider.createLabels(data);
        });
    }

    if (changes.toggleProvinces != null && changes.toggleProvinces.currentValue) {
      changes.toggleProvinces.currentValue.forEach(p => {
        const dataSetIndex = this.chartData
          .map(d => d.label)
          .indexOf(p.code);
        this.chart.hideDataset(dataSetIndex, p.disabled);
      });
    }
  }
}
