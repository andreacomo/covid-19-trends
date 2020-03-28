import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { LinearChartProvider } from '../../../../commons/services/linear-chart-provider';
import { LocalDataService } from 'src/app/commons/services/local-data.service';
import { Province } from 'src/app/commons/models/province';
import { LineChartComponent, ChartDataType } from 'src/app/commons/components/line-chart/line-chart.component';
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

  @ViewChild('chart', { static: false })
  chart: LineChartComponent;

  private chartDataType: ChartDataType = {
    label: 'Casi totali',
    value: 'totale_casi',
    active: true,
    transformer: (values) => values.map(v => v.totale_casi),
    lineDash: []
  };

  constructor(private github: GithubService,
              private chartProvider: LinearChartProvider) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.district != null && changes.district.currentValue) {
      this.github.getAllDataInDistrict(changes.district.currentValue)
        .subscribe(data => {
          this.chartData = this.chartProvider.createChartData<ProvinceData>(data, this.chartDataType);

          this.labels = this.chartProvider.createLabels<ProvinceData>(data);
        });
    }

    if (changes.toggleProvinces != null && changes.toggleProvinces.currentValue) {
      changes.toggleProvinces.currentValue.forEach(p => {
        const dataSetIndex = this.chartData
          .map(d => d.label)
          .indexOf(p.sigla_provincia);
        this.chart.hideDataset(dataSetIndex, p.disabled);
      });
    }
  }
}
