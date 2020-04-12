import { Component, OnInit } from '@angular/core';
import { NationalData } from 'src/app/commons/models/national-data';
import { GithubService } from 'src/app/commons/services/github.service';
import { ChartConfig } from './national-data-chart/national-data-chart.component';
import { Colors } from 'src/app/commons/models/colors';
import { DifferentialData } from '../models/differential-data';

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

  newDeadVsSwabsCasesConfig: ChartConfig;

  newSwabsCasesConfig: ChartConfig;

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getAllNationalData()
      .subscribe(data => {
        this.allNationalData = this.addDifferentialData(data);
      });

    this.dataLatestDays = 40;
    this.smaWindow = 7;

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
    this.newDeadVsSwabsCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_positivi_su_nuovi_tamponi',
      dataLatestDays: this.dataLatestDays,
      dataLabel: '% nuovi casi/nuovi tamponi',
      dataBarColor: Colors.SUPPORTED[13],
      title: `Percentuale nuovi casi rispetto ai nuovi tamponi`,
      isPercentage: true
    };
    this.newSwabsCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_tamponi',
      dataLatestDays: this.dataLatestDays,
      dataLabel: 'Nuovi tamponi',
      dataBarColor: Colors.SUPPORTED[15],
      title: `Nuovi tamponi (rispetto al giorno precedente)`
    };
  }

  private addDifferentialData(data: NationalData[]): (NationalData & DifferentialData)[] {
    return data.map((current, i) => {
      if (i > 0) {
        const previous = data[i - 1];
        const newSwabs = current.tamponi - previous.tamponi;
        return {
          ...current,
          nuovi_deceduti: current.deceduti - previous.deceduti,
          nuovi_tamponi: newSwabs,
          nuovi_positivi_su_nuovi_tamponi: (current.nuovi_positivi / newSwabs) * 100
        };
      } else {
        return null;
      }
    });
  }
}
