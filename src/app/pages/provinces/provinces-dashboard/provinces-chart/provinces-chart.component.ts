import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { LinearChartProvider } from '../../../../commons/services/linear-chart-provider';
import { LocalDataService } from 'src/app/commons/services/local-data.service';
import { Province } from 'src/app/commons/models/province';
import { LineChartComponent } from 'src/app/commons/components/line-chart/line-chart.component';
import { ProvinceData } from 'src/app/commons/models/province-data';

@Component({
  selector: 'app-provinces-chart',
  templateUrl: './provinces-chart.component.html',
  styleUrls: ['./provinces-chart.component.scss']
})
export class ProvincesChartComponent implements OnInit, OnChanges {

  @Input()
  district: string;

  @Input()
  toggleProvinces: Province[];

  chartData: ChartDataSets[];

  labels: Label[];

  updatedOn: Date;

  @ViewChild('chart', { static: false })
  chart: LineChartComponent;

  constructor(private github: GithubService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.district != null && changes.district.currentValue) {
      this.github.getAllDataInDistrict(changes.district.currentValue)
        .subscribe(data => {
          this.chartData = LinearChartProvider.createChartData<ProvinceData>(data, (values) => values.map(v => v.totale_casi));

          this.labels = LinearChartProvider.createLabels<ProvinceData>(data);

          this.updatedOn = LinearChartProvider.createUpdatedOn<ProvinceData>(data);
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
