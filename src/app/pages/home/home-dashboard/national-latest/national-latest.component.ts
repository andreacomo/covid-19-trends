import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NationalData } from 'src/app/commons/models/national-data';

@Component({
  selector: 'app-national-latest',
  templateUrl: './national-latest.component.html',
  styleUrls: ['./national-latest.component.scss']
})
export class NationalLatestComponent implements OnInit, OnChanges {

  @Input()
  data: NationalData;

  items: any[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.items = [{
        label: 'Totale casi',
        value: this.data.totale_casi
      }, {
        label: 'Tamponi',
        value: this.data.tamponi
      }, {
        label: 'Deceduti',
        value: this.data.deceduti
      }, {
        label: 'Dimessi guariti',
        value: this.data.dimessi_guariti
      }, {
        label: 'Nuovi positivi',
        value: this.data.nuovi_positivi
      }, {
        label: 'Totale positivi',
        value: this.data.totale_positivi
      }, {
        label: 'Totale ospedalizzazioni',
        value: this.data.totale_ospedalizzati
      }, {
        label: 'Terapia intensiva',
        value: this.data.terapia_intensiva
      }, {
        label: 'Ricoverati',
        value: this.data.ricoverati_con_sintomi
      }];
    }
  }

}
