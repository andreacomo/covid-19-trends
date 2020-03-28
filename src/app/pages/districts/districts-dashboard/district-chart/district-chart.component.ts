import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { LineChartComponent, ChartDataType } from 'src/app/commons/components/line-chart/line-chart.component';
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

  availableChartTypes: ChartDataType[] = [{
      label: 'Casi totali',
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
    }, {
      label: 'Dimessi guariti',
      value: 'dimessi',
      active: false,
      transformer: (values) => values.map(v => v.dimessi_guariti),
      lineDash: [10, 2, 2, 2]
    }, {
      label: 'Ricoverati',
      value: 'ricoverati',
      active: false,
      transformer: (values) => values.map(v => v.ricoverati_con_sintomi),
      lineDash: [3, 6, 3, 6]
    }, {
      label: 'Terapia intensiva',
      value: 'terapia_intensiva',
      active: false,
      transformer: (values) => values.map(v => v.terapia_intensiva),
      lineDash: [4, 4, 2, 4]
    }];

  @ViewChild('chart', { static: false })
  chart: LineChartComponent;

  private currentData: {[name: string]: DistrictData[]};

  constructor(private github: GithubService,
              private chartProvider: LinearChartProvider) { }

  ngOnInit() {
    this.github.getAllDistrictsData()
      .subscribe(data => {
        this.currentData = data;
        this.initDataSet(data);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.toggleDistricts.isFirstChange()) {
      this.github.getAllDistrictsData()
        .subscribe(data => {
          this.currentData = data;
          changes.toggleDistricts.currentValue
                                .filter(d => d.disabled)
                                .forEach(d => {
                                  delete this.currentData[d.denominazione_regione];
                                });
          this.initDataSet(this.currentData);
        });
    }
  }

  toggle(event: ChartDataType) {
    this.availableChartTypes
      .filter(c => c.value === event.value)
      .forEach(c => c.active = event.active);

    this.initDataSet(this.currentData);
  }

  private initDataSet(data: {[name: string]: DistrictData[]}) {
    this.chartData = this.availableChartTypes
                      .filter(c => c.active)
                      .flatMap(c => this.chartProvider.createChartData<DistrictData>(data, c));

    if (Object.keys(data).length) {
      this.labels = this.chartProvider.createLabels<DistrictData>(data);
    }
  }
}
