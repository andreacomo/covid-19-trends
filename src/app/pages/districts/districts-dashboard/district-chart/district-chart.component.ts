import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { LineChartComponent, ChartDataType } from 'src/app/commons/components/line-chart/line-chart.component';
import { GithubService } from 'src/app/commons/services/github.service';
import { LinearChartProvider } from 'src/app/commons/services/linear-chart-provider';
import { GroupData } from 'src/app/commons/models/group-data';
import { ThrowStmt } from '@angular/compiler';

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

  availableChartTypes: ChartDataType[] = [{
      label: 'Totale Casi',
      value: 'totale_casi',
      active: true,
      transformer: (values) => values.map(v => v.totale_casi),
      lineDash: []
    }, {
      label: 'Tamponi',
      value: 'tamponi',
      active: false,
      transformer: (values) => values.map(v => v.tamponi),
      lineDash: [15, 5]
    }, {
      label: 'Decessi',
      value: 'decessi',
      active: false,
      transformer: (values) => values.map(v => v.deceduti),
      lineDash: [3, 3]
    }];

  @ViewChild('chart', { static: false })
  chart: LineChartComponent;

  private cachedDistrictsData: {[name: string]: DistrictData[]};

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getAllDistrictsData()
      .subscribe(data => {
        this.cachedDistrictsData = data;
        this.initDataSet(data);
        this.updatedOn = LinearChartProvider.createUpdatedOn<DistrictData>(data);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*if (changes.toggleDistricts != null && changes.toggleDistricts.currentValue) {
      changes.toggleDistricts.currentValue.forEach(p => {
        const dataSetIndex = this.chartData
          .map(d => d.label)
          .indexOf(p.denominazione_regione);
        this.chart.hideDataset(dataSetIndex, p.disabled);
      });
    }
    */
    if (!changes.toggleDistricts.isFirstChange()) {
      this.github.getAllDistrictsData()
        .subscribe(data => {
          this.cachedDistrictsData = data;
          changes.toggleDistricts.currentValue
                                .filter(d => d.disabled)
                                .forEach(d => {
                                  delete this.cachedDistrictsData[d.denominazione_regione];
                                });
          this.initDataSet(this.cachedDistrictsData);
        });
    }
  }

  toggle(event: ChartDataType) {
    this.availableChartTypes
      .filter(c => c.value === event.value)
      .forEach(c => c.active = event.active);

    this.initDataSet(this.cachedDistrictsData);
  }

  private initDataSet(data: {[name: string]: DistrictData[]}) {
    this.chartData = this.availableChartTypes
                      .filter(c => c.active)
                      .flatMap(c => LinearChartProvider.createChartData<DistrictData>(data, c));

    if (Object.keys(data).length) {
      this.labels = LinearChartProvider.createLabels<DistrictData>(data);
    }
  }
}
