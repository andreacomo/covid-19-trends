import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { LinearChartProvider } from '../../../../commons/services/linear-chart-provider';
import { Province } from 'src/app/commons/models/province';
import { ProvinceData } from 'src/app/commons/models/province-data';
import { LinearChartDataTypeProvider } from 'src/app/commons/services/linear-chart-data-type-provider';
import { TimeFilter } from 'src/app/commons/models/time-filter';
import { DataFilterProviderService } from 'src/app/commons/services/data-filter-provider.service';
import { ChartDataType } from 'src/app/commons/models/chart-data-type';
import { ChartDataTypeDecorator } from 'src/app/commons/models/chart-data-type-decorator';

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

  private currentData: {[code: string]: ProvinceData[]};

  private chartDataType: ChartDataType;

  private timeFilter: TimeFilter;

  private percentageAdapter: ChartDataTypeDecorator;

  constructor(private github: GithubService,
              private chartProvider: LinearChartProvider,
              private chartTypeProvider: LinearChartDataTypeProvider,
              private filtersProvider: DataFilterProviderService) { }

  ngOnInit() {
    this.chartDataType = this.chartTypeProvider.get('totale_casi');
    this.timeFilter = this.filtersProvider.getTimeFilterByScope('all');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.district != null && changes.district.currentValue) {
      this.github.getAllDataInDistrict(changes.district.currentValue)
        .subscribe(data => {
          this.currentData = data;
          this.initDataSet(data);
        });
    }

    if (changes.toggleProvinces != null && changes.toggleProvinces.currentValue) {
      this.github.getAllDataInDistrict(this.district)
        .subscribe(data => {
          this.currentData = data;
          changes.toggleProvinces.currentValue
                                .filter(d => d.disabled)
                                .forEach(d => {
                                  delete this.currentData[d.sigla_provincia];
                                });
          this.initDataSet(this.currentData);
        });
    }
  }

  private initDataSet(data: {[code: string]: ProvinceData[]}) {
    const filters = [this.timeFilter];
    const chartDataType = this.percentageAdapter ? this.percentageAdapter.decorate(this.chartDataType) : this.chartDataType;
    this.chartData = this.chartProvider.createChartData<ProvinceData>(data, chartDataType, {}, filters);

    this.labels = this.chartProvider.createLabels<ProvinceData>(data, filters);
  }

  applyTimeFilter(filter: TimeFilter) {
    this.timeFilter = filter;
    this.initDataSet(this.currentData);
  }

  applyPercentAdapter(adapter: ChartDataTypeDecorator) {
    this.percentageAdapter = adapter;
    this.initDataSet(this.currentData);
  }
}
