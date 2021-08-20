import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConsoleReporter } from 'jasmine';
import { NationalData } from 'src/app/commons/models/national-data';
import { MeanData } from '../../models/mean-data';
import { Trend } from '../../models/trend';
import { LatestProviderService } from '../../services/latest-data-provider.service';

@Component({
  selector: 'app-positivity-index-card',
  templateUrl: './positivity-index-card.component.html',
  styleUrls: ['./positivity-index-card.component.scss']
})
export class PositivityIndexCardComponent implements OnInit, OnChanges {

  @Input()
  data: (NationalData & {pos_index: number})[];

  index: number;

  trend: Trend;

  constructor(private dataProvider: LatestProviderService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      const enrichedData = this.data.map((d, i, data) => {
        if (i === 0) {
          return {
            ...d,
            pos_index: 0
          };
        } else {
          return {
            ...d,
            pos_index: (d.nuovi_positivi / (d.tamponi - data[i - 1].tamponi)) * 100
          };
        }
      });
      this.index = enrichedData[enrichedData.length - 1].pos_index;
      const yesterdayIndex = enrichedData[enrichedData.length - 2].pos_index;
      const indexMeanData = new MeanData(this.index, this.index + .50, this.index - .50);
      this.trend = indexMeanData.trendOf(yesterdayIndex);
    }
  }
}
