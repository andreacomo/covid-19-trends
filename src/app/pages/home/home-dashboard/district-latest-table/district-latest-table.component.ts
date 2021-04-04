import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { DateStringPipe } from 'src/app/commons/pipes/date-string.pipe';
import { LatestProviderService } from '../../services/latest-data-provider.service';
import { MeanData } from '../../models/mean-data';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Trend } from '../../models/trend';
import { EnrichedDataGroup } from '../../models/enriched-district-data-group';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Sort } from '@angular/material/sort';
import { Category, GoogeAnalyticsService } from 'src/app/commons/services/googe-analytics.service';

@Component({
  selector: 'app-district-latest-table',
  templateUrl: './district-latest-table.component.html',
  styleUrls: ['./district-latest-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class DistrictLatestTableComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  data: {[district: string]: DistrictData[]};

  tableData: any[];

  tableDef: any;

  displayedColumns: string[];

  chartData: EnrichedDataGroup<DistrictData>;

  expandedElement; any;

  private meanData: {[district: string]: MeanData};

  private watcher: Subscription;

  constructor(private dataProvider: LatestProviderService,
              private dateString: DateStringPipe,
              private mediaObserver: MediaObserver,
              private googleAnalyticsService: GoogeAnalyticsService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.chartData = this.dataProvider.createDataTotalCases<DistrictData>(this.data);
      this.meanData = this.dataProvider.createMeanDataDiffTotalCases<DistrictData>(this.chartData);

      this.tableData = Object.entries(this.chartData)
          .filter(([code]) => code)
          .map(([code, values]) => {
            return {
              district: code,
              districtColor: values[0].color,
              beforeBeforeLatest: values[0].diff_totale_casi,
              beforeBeforeLatestPercent: values[0].diff_percent_totale_casi,
              beforeLatest: values[1].diff_totale_casi,
              beforeLatestPercent: values[1].diff_percent_totale_casi,
              latest: values[2].diff_totale_casi,
              latestPercent: values[2].diff_percent_totale_casi
            };
          });

      const firstValues = Object.entries(this.chartData)[0][1];
      this.tableDef = {
        district: 'Regioni',
        beforeBeforeLatest: this.dateString.transform(firstValues[0].data),
        beforeLatest: this.dateString.transform(firstValues[1].data),
        latest: this.dateString.transform(firstValues[2].data)
      };

      this.watcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
        if (['lg', 'xl', 'md'].indexOf(change.mqAlias) !== -1) {
          this.displayedColumns = ['district', 'beforeBeforeLatest', 'beforeLatest', 'latest', 'icon'];
        } else if (change.mqAlias === 'xs') {
          this.displayedColumns = ['district', 'latest'];
        } else if (change.mqAlias === 'sm') {
          this.displayedColumns = ['district', 'beforeLatest', 'latest', 'icon'];
        }
      });
    }
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  getTrendOf(district: string, value: number): Trend {
    return this.meanData[district].trendOf(value);
  }

  getTrend(district: string, value: number): string {
    switch (this.getTrendOf(district, value)) {
      case Trend.MARKED_IMPROVEMENT:
        return 'good';
      case Trend.IMPROVEMENT:
        return 'good-ish';
      case Trend.DETERIORATION:
        return 'bad-ish';
      case Trend.SHARP_DETERIORATION:
        return 'bad';
      default:
        return 'bad';
    }
  }

  onSortChange(sort: Sort) {
    if (sort.active && sort.direction) {
      const isAsc = sort.direction === 'asc';
      this.tableData.sort((i1, i2) => {
        return (i1[sort.active] < i2[sort.active] ? -1 : 1) * (isAsc ? 1 : -1);
      });
    }
  }

  onExpand(event) {
    if (event?.district) {
      const normalizedDistrict = event.district.toLowerCase()
        .replace(/\s+/g, '_')
        .replace('-', '_')
        .replace(/\./g, '')
        .replace(/[']/g, '_');
      this.googleAnalyticsService.emitEvent(
        `ita_covid_home_district_latest_table_open_row_${normalizedDistrict}`,
        'Tabella in homepage: apertura riga',
        Category.INTERACTION
      );
    }
  }
}
