import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NationalData } from 'src/app/commons/models/national-data';
import { LatestProviderService as LatestDataProviderService } from '../../services/latest-data-provider.service';
import { MeanData } from '../../models/mean-data';
import { EnrichedData } from '../../models/enriched-data';

@Component({
  selector: 'app-national-latest',
  templateUrl: './national-latest.component.html',
  styleUrls: ['./national-latest.component.scss']
})
export class NationalLatestComponent implements OnInit, OnChanges {

  @Input()
  data: NationalData[];

  items: any[];

  updatedAt: Date;

  constructor(private dataProvider: LatestDataProviderService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      const latest3Days: (NationalData & EnrichedData)[] = this.dataProvider.createDiffWithPreviousDay<NationalData>(
        this.data,
        'totale_casi',
        'tamponi',
        'deceduti',
        'dimessi_guariti',
        'nuovi_positivi',
        'totale_positivi',
        'totale_ospedalizzati',
        'terapia_intensiva',
        'ricoverati_con_sintomi'
      );
      this.items = this.createItems(latest3Days);
      this.updatedAt = new Date(latest3Days[latest3Days.length - 1].data);
    }
  }

  private createItems(latest3Days: (NationalData & EnrichedData)[]): any[] {
    const latest = latest3Days[latest3Days.length - 1];
    return [{
      label: 'Totale casi',
      value: latest.totale_casi,
      valueDif: latest.diff_totale_casi,
      valueDifPercent: latest.diff_percent_totale_casi,
      mean: this.dataProvider.createMeanDataOn(latest3Days, 'diff_totale_casi')
    }, {
      label: 'Tamponi',
      value: latest.tamponi,
      valueDif: latest.diff_tamponi,
      valueDifPercent: latest.diff_percent_tamponi,
      mean: this.dataProvider.createMeanDataOn(latest3Days, 'diff_tamponi')
    }, {
      label: 'Deceduti',
      value: latest.deceduti,
      valueDif: latest.diff_deceduti,
      valueDifPercent: latest.diff_percent_deceduti,
      mean: this.dataProvider.createMeanDataOn(latest3Days, 'diff_deceduti')
    }, {
      label: 'Dimessi guariti',
      value: latest.dimessi_guariti,
      valueDif: latest.diff_dimessi_guariti,
      valueDifPercent: latest.diff_percent_dimessi_guariti,
      mean: this.dataProvider.createMeanDataOn(latest3Days, 'diff_dimessi_guariti')
    }, {
      label: 'Nuovi positivi',
      value: latest.nuovi_positivi,
      valueDif: latest.diff_nuovi_positivi,
      valueDifPercent: latest.diff_percent_nuovi_positivi,
      mean: this.dataProvider.createMeanDataOn(latest3Days, 'diff_nuovi_positivi')
    }, {
      label: 'Totale positivi',
      value: latest.totale_positivi,
      valueDif: latest.diff_totale_positivi,
      valueDifPercent: latest.diff_percent_totale_positivi,
      mean: this.dataProvider.createMeanDataOn(latest3Days, 'diff_totale_positivi')
    }, {
      label: 'Ospedalizzazioni',
      value: latest.totale_ospedalizzati,
      valueDif: latest.diff_totale_ospedalizzati,
      valueDifPercent: latest.diff_percent_totale_ospedalizzati,
      mean: this.dataProvider.createMeanDataOn(latest3Days, 'diff_totale_ospedalizzati')
    }, {
      label: 'Terapia intensiva',
      value: latest.terapia_intensiva,
      valueDif: latest.diff_terapia_intensiva,
      valueDifPercent: latest.diff_percent_terapia_intensiva,
      mean: this.dataProvider.createMeanDataOn(latest3Days, 'diff_terapia_intensiva')
    }, {
      label: 'Ricoverati',
      value: latest.ricoverati_con_sintomi,
      valueDif: latest.diff_ricoverati_con_sintomi,
      valueDifPercent: latest.diff_percent_ricoverati_con_sintomi,
      mean: this.dataProvider.createMeanDataOn(latest3Days, 'diff_ricoverati_con_sintomi')
    }];
  }
}
