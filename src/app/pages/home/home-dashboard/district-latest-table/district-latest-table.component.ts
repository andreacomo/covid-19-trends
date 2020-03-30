import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { DateStringPipe } from 'src/app/commons/pipes/date-string.pipe';
import { DistrictLatestProviderService } from '../../services/district-latest-provider.service';
import { EnrichedDistrict } from '../../models/enriched-district';
import { MeanData } from '../../models/mean-data';

@Component({
  selector: 'app-district-latest-table',
  templateUrl: './district-latest-table.component.html',
  styleUrls: ['./district-latest-table.component.scss']
})
export class DistrictLatestTableComponent implements OnInit, OnChanges {

  @Input()
  data: {[district: string]: DistrictData[]};

  tableData: any[];

  tableDef: any;

  displayedColumns: string[];

  private meanData: {[district: string]: MeanData};

  constructor(private dataProvider: DistrictLatestProviderService,
              private dateString: DateStringPipe) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      const chartData = this.dataProvider.createData(this.data);
      this.meanData = this.dataProvider.createMeanData(chartData);

      this.tableData = Object.entries(chartData)
          .filter(([code]) => code)
          .map(([code, values]) => {
            return {
              district: code,
              districtColor: values[0].color,
              beforeBeforeLatest: values[0].diff_casi,
              beforeBeforeLatestPercent: values[0].diff_casi_percent,
              beforeLatest: values[1].diff_casi,
              beforeLatestPercent: values[1].diff_casi_percent,
              latest: values[2].diff_casi,
              latestPercent: values[2].diff_casi_percent
            };
          });

      const firstValues = Object.entries(chartData)[0][1];
      this.tableDef = {
        district: 'Regioni',
        beforeBeforeLatest: this.dateString.transform(firstValues[0].data),
        beforeLatest: this.dateString.transform(firstValues[1].data),
        latest: this.dateString.transform(firstValues[2].data)
      };

      this.displayedColumns = Object.keys(this.tableDef);
    }
  }

  getColor(district: string, value: number): string {
    if (value <= this.meanData[district].subMean) {
      return 'good';
    } else if (value > this.meanData[district].subMean && value <= this.meanData[district].mean) {
      return 'good-ish';
    } else if (value > this.meanData[district].mean && value <= this.meanData[district].superMean) {
      return 'bad-ish';
    } else { // value > this.meanData[district].superMean
      return 'bad';
    }
  }
}
