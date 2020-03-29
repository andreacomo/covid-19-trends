import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { DateStringPipe } from 'src/app/commons/pipes/date-string.pipe';
import { DistrictLatestProviderService } from '../../services/district-latest-provider.service';

@Component({
  selector: 'app-district-latest-table',
  templateUrl: './district-latest-table.component.html',
  styleUrls: ['./district-latest-table.component.scss']
})
export class DistrictLatestTableComponent implements OnInit, OnChanges {

  @Input()
  data: {[name: string]: DistrictData[]};

  tableData: any[];

  tableDef: any[];

  displayedColumns: string[];

  constructor(private dataProvider: DistrictLatestProviderService,
              private dateString: DateStringPipe) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      const chartData = this.dataProvider.createData(this.data);

      this.tableData = Object.entries(chartData)
          .filter(([code]) => code)
          .map(([code, values]) => {
            return {
              district: code,
              beforeBeforeLatest: values[0].diff_casi,
              beforeLatest: values[1].diff_casi,
              latest: values[2].diff_casi
            };
          });

      const firstValues = Object.entries(chartData)[0][1];
      this.tableDef = [{
        dataKey: 'district',
        label: 'Regioni'
      }, {
        dataKey: 'beforeBeforeLatest',
        label: this.dateString.transform(firstValues[0].data)
      }, {
        dataKey: 'beforeLatest',
        label: this.dateString.transform(firstValues[1].data)
      }, {
        dataKey: 'latest',
        label: this.dateString.transform(firstValues[2].data)
      }];

      this.displayedColumns = this.tableDef.map(d => d.dataKey);
      console.log(this.tableData);
    }
  }
}
