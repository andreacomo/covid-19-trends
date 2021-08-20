import { Component, OnInit } from '@angular/core';
import { NationalData } from 'src/app/commons/models/national-data';
import { DpcCovid19Service } from 'src/app/commons/services/dpc-covid19.service';
import { ChartConfig } from './national-data-chart/national-data-chart.component';
import { Colors } from 'src/app/commons/models/colors';
import { DifferentialData } from '../models/differential-data';

@Component({
  selector: 'app-national-trend',
  templateUrl: './national-trend.component.html',
  styleUrls: ['./national-trend.component.scss']
})
export class NationalTrendComponent implements OnInit {

  selectedMonths: number;

  smaWindow: number;

  allNationalData: NationalData[];

  newCasesConfig: ChartConfig;

  allCasesConfig: ChartConfig;

  deadCasesConfig: ChartConfig;

  newDeadCasesConfig: ChartConfig;

  newDeadVsSwabsCasesConfig: ChartConfig;

  newSwabsCasesConfig: ChartConfig;

  newHospitalizedCasesConfig: ChartConfig;

  hospitalizedCasesConfig: ChartConfig;

  newIntensiveCareCasesConfig: ChartConfig;

  intensiveCareCasesConfig: ChartConfig;

  newHospitalizedVsNewCasesConfig: ChartConfig;

  intensiveCareVsTotalHospitalizedCasesConfig: ChartConfig;

  constructor(private github: DpcCovid19Service) { }

  ngOnInit() {
    this.github.getAllNationalData()
      .subscribe(data => {
        this.allNationalData = this.addDifferentialData(data);
        this.selectedMonths = 2;
        this.smaWindow = 7;
        this.createConfigs(this.selectedMonths * 30);
      });
  }

  onTimeFrameChange(months: number) {
    this.selectedMonths = months;
    this.createConfigs(this.selectedMonths * 30);
  }

  private createConfigs(dataLatestDays: number) {
    this.newCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_positivi',
      dataLatestDays,
      dataLabel: 'Nuovi casi',
      dataBarColor: Colors.SUPPORTED[0],
      title: `Nuovi casi totali (rispetto al giorno precedente)`
    };
    this.allCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'totale_casi',
      dataLatestDays,
      dataLabel: 'Totale casi',
      dataBarColor: Colors.SUPPORTED[3],
      title: `Totale casi`
    };
    this.deadCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'deceduti',
      dataLatestDays,
      dataLabel: 'Totale deceduti',
      dataBarColor: Colors.SUPPORTED[7],
      title: `Totale deceduti`
    };
    this.newDeadCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_deceduti',
      dataLatestDays,
      dataLabel: 'Nuovi deceduti',
      dataBarColor: Colors.SUPPORTED[8],
      title: `Nuovi deceduti (rispetto al giorno precedente)`
    };
    this.newDeadVsSwabsCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_positivi_su_nuovi_tamponi',
      dataLatestDays,
      dataLabel: '% nuovi casi/nuovi tamponi',
      dataBarColor: Colors.SUPPORTED[13],
      title: `Percentuale nuovi casi rispetto ai nuovi tamponi`,
      isPercentage: true
    };
    this.newSwabsCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_tamponi',
      dataLatestDays,
      dataLabel: 'Nuovi tamponi',
      dataBarColor: Colors.SUPPORTED[15],
      title: `Nuovi tamponi (rispetto al giorno precedente)`
    };
    this.newHospitalizedCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_ricoverati_con_sintomi',
      dataLatestDays,
      dataLabel: 'Nuovi ricoverati',
      dataBarColor: Colors.SUPPORTED[16],
      title: `Nuovi ricoverati (rispetto al giorno precedente)`
    };
    this.hospitalizedCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'ricoverati_con_sintomi',
      dataLatestDays,
      dataLabel: 'Totale ricoverati con sintomi',
      dataBarColor: Colors.SUPPORTED[8],
      title: `Totale ricoverati con sintomi`
    };
    this.newIntensiveCareCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_terapia_intensiva',
      dataLatestDays,
      dataLabel: 'Nuovi casi terapia intensiva',
      dataBarColor: Colors.SUPPORTED[14],
      title: `Nuovi casi terapia intensiva (rispetto al giorno precedente)`
    };
    this.intensiveCareCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'terapia_intensiva',
      dataLatestDays,
      dataLabel: 'Totale terapia intensiva',
      dataBarColor: Colors.SUPPORTED[6],
      title: `Totale terapia intensiva`
    };
    this.newHospitalizedVsNewCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'nuovi_ricoverati_su_nuovi_positivi',
      dataLatestDays,
      dataLabel: '% nuovi ricoverati / nuovi casi',
      dataBarColor: Colors.SUPPORTED[17],
      title: `% nuovi ricoverati / nuovi casi (rispetto al giorno precedente)`
    };
    this.intensiveCareVsTotalHospitalizedCasesConfig = {
      smaWindow: this.smaWindow,
      smaLabel: `Media mobile a ${this.smaWindow} giorni`,
      metric: 'terapia_intensiva_su_ricoverati',
      dataLatestDays,
      dataLabel: '% terapia intensiva / ricoverati',
      dataBarColor: Colors.SUPPORTED[10],
      title: `% totale terapia intensiva / ricoverati (rispetto al giorno precedente)`
    };
  }

  private addDifferentialData(data: NationalData[]): (NationalData & DifferentialData)[] {
    return data.map((current, i) => {
      if (i > 0) {
        const previous = data[i - 1];
        const newSwabs = current.tamponi - previous.tamponi;
        const newHospitalized = current.ricoverati_con_sintomi - previous.ricoverati_con_sintomi;
        const newIntensiveCare = current.terapia_intensiva - previous.terapia_intensiva;
        return {
          ...current,
          nuovi_deceduti: current.deceduti - previous.deceduti,
          nuovi_tamponi: newSwabs,
          nuovi_positivi_su_nuovi_tamponi: (current.nuovi_positivi / newSwabs) * 100,
          nuovi_ricoverati_su_nuovi_positivi: (newHospitalized / current.nuovi_positivi) * 100,
          nuovi_ricoverati_con_sintomi: newHospitalized,
          nuovi_terapia_intensiva: newIntensiveCare,
          terapia_intensiva_su_ricoverati: (current.terapia_intensiva / current.ricoverati_con_sintomi) * 100,
        };
      } else {
        return null;
      }
    });
  }
}
