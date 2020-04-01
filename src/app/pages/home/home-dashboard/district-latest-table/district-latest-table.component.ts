import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { DateStringPipe } from 'src/app/commons/pipes/date-string.pipe';
import { DistrictLatestProviderService } from '../../services/district-latest-provider.service';
import { MeanData } from '../../models/mean-data';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Trend } from '../../models/trend';
import { EnrichedDistrictDataGroup } from '../../models/enriched-district-data-group';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-district-latest-table',
  templateUrl: './district-latest-table.component.html',
  styleUrls: ['./district-latest-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DistrictLatestTableComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  data: {[district: string]: DistrictData[]};

  tableData: any[];

  tableDef: any;

  displayedColumns: string[];

  chartData: EnrichedDistrictDataGroup;

  private meanData: {[district: string]: MeanData};

  private watcher: Subscription;

  constructor(private dataProvider: DistrictLatestProviderService,
              private dateString: DateStringPipe,
              private mediaObserver: MediaObserver) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.chartData = this.dataProvider.createData(this.data);
      this.meanData = this.dataProvider.createMeanData(this.chartData);

      this.tableData = Object.entries(this.chartData)
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

  getTooltip(district: string, value: number): string {
    switch (this.getTrendOf(district, value)) {
      case Trend.MARKED_IMPROVEMENT:
        return 'Netto miglioramento';
      case Trend.IMPROVEMENT:
        return 'Miglioramento lieve';
      case Trend.DETERIORATION:
        return 'Peggioramento lieve';
      case Trend.SHARP_DETERIORATION:
        return 'Netto peggioramento';
      default:
        return 'bad';
    }
  }
}
