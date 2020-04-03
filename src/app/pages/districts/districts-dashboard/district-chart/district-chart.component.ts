import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { LineChartComponent, ChartDataType } from 'src/app/commons/components/line-chart/line-chart.component';
import { GithubService } from 'src/app/commons/services/github.service';
import { LinearChartProvider } from 'src/app/commons/services/linear-chart-provider';
import { LinearChartDataTypeProvider } from 'src/app/commons/services/linear-chart-data-type-provider';

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

  availableChartTypes: ChartDataType[];

  @ViewChild('chart', { static: false })
  chart: LineChartComponent;

  private currentData: {[name: string]: DistrictData[]};

  constructor(private github: GithubService,
              private chartProvider: LinearChartProvider,
              private chartTypeProvider: LinearChartDataTypeProvider) { }

  ngOnInit() {
    this.github.getAllDistrictsData()
      .subscribe(data => {
        this.currentData = data;
        this.initDataSet(data);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.toggleDistricts.isFirstChange()) {
      this.availableChartTypes = this.chartTypeProvider.getAll();
    } else {
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
