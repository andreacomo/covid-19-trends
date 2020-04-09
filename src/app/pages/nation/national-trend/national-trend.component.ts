import { Component, OnInit } from '@angular/core';
import { NationalData } from 'src/app/commons/models/national-data';
import { GithubService } from 'src/app/commons/services/github.service';
import { ChartConfig } from './national-data-chart/national-data-chart.component';
import { Colors } from 'src/app/commons/models/colors';

@Component({
  selector: 'app-national-trend',
  templateUrl: './national-trend.component.html',
  styleUrls: ['./national-trend.component.scss']
})
export class NationalTrendComponent implements OnInit {

  dataLatestDays: number;

  smaWindow: number;

  allNationalData: NationalData[];

  newCasesConfig: ChartConfig;

  allCasesConfig: ChartConfig;

  deadCasesConfig: ChartConfig;

  newDeadCasesConfig: ChartConfig;

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getAllNationalData()
      .subscribe(data => {
        this.allNationalData = this.addNewDeads(data);
      });

    this.dataLatestDays = 40;
    this.smaWindow = 5;

    this.newCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_positivi',
      dataLatestDays: this.dataLatestDays,
      dataLabel: 'Nuovi casi',
      dataBarColor: Colors.SUPPORTED[0],
      title: `Nuovi casi totali (rispetto al giorno precedente)`
    };
    this.allCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'totale_casi',
      dataLatestDays: this.dataLatestDays,
      dataLabel: 'Totale casi',
      dataBarColor: Colors.SUPPORTED[3],
      title: `Totale casi`
    };
    this.deadCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'deceduti',
      dataLatestDays: this.dataLatestDays,
      dataLabel: 'Totale deceduti',
      dataBarColor: Colors.SUPPORTED[7],
      title: `Totale deceduti`
    };
    this.newDeadCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_deceduti',
      dataLatestDays: this.dataLatestDays,
      dataLabel: 'Nuovi deceduti',
      dataBarColor: Colors.SUPPORTED[8],
      title: `Nuovi deceduti (rispetto al giorno precedente)`
    };
  }

  private addNewDeads(data: NationalData[]): (NationalData & {nuovi_deceduti: number})[] {
    return data.map((d, i) => {
      if (i > 0) {
        return {
          ...d,
          nuovi_deceduti: d.deceduti - data[i - 1].deceduti
        };
      } else {
        return null;
      }
    });
  }
}
