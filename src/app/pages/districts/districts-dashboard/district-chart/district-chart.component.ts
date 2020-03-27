import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { LineChartComponent } from 'src/app/commons/components/line-chart/line-chart.component';
import { GithubService } from 'src/app/commons/services/github.service';
import { LinearChartProvider } from 'src/app/commons/services/linear-chart-provider';

@Component({
  selector: 'app-district-chart',
  templateUrl: './district-chart.component.html',
  styleUrls: ['./district-chart.component.scss']
})
export class DistrictChartComponent implements OnInit, OnChanges {

  @Input()
  toggleDistricts: DistrictData[];

  chartData: ChartDataSets[];

  labels: Label[];

  updatedOn: Date;

  @ViewChild('chart', { static: false })
  chart: LineChartComponent;

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getAllDistrictsData()
      .subscribe(data => {
        this.chartData = LinearChartProvider.createChartData<DistrictData>(data, (values) => values.map(v => v.totale_casi));

        this.labels = LinearChartProvider.createLabels<DistrictData>(data);

        this.updatedOn = LinearChartProvider.createUpdatedOn<DistrictData>(data);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.toggleDistricts != null && changes.toggleDistricts.currentValue) {
      changes.toggleDistricts.currentValue.forEach(p => {
        const dataSetIndex = this.chartData
          .map(d => d.label)
          .indexOf(p.denominazione_regione);
        this.chart.hideDataset(dataSetIndex, p.disabled);
      });
    }
  }

}
