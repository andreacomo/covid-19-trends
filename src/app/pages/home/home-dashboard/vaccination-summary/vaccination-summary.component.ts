import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItalianVaccinationService } from 'src/app/commons/services/italian-vaccination.service';
import { VaccinationPerDay } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-per-day';

@Component({
  selector: 'app-vaccination-summary',
  templateUrl: './vaccination-summary.component.html',
  styleUrls: ['./vaccination-summary.component.scss']
})
export class VaccinationSummaryComponent implements OnInit {

  total$: Observable<string>;

  firstDoseTotal$: Observable<string>;

  secondDoseTotal$: Observable<string>;

  totalMen$: Observable<string>;

  totalWomen$: Observable<string>;

  lastUpdate$: Observable<Date>;

  todayVaccination: VaccinationPerDay;

  constructor(private vaccinationService: ItalianVaccinationService) { }

  ngOnInit(): void {
    this.total$ = this.vaccinationService.getTotal()
      .pipe(
        map(data => data.toLocaleString())
      );

    this.firstDoseTotal$ = this.vaccinationService.getFirstDosesTotal()
      .pipe(
        map(data => data.toLocaleString())
      );

    this.secondDoseTotal$ = this.vaccinationService.getSecondDosesTotal()
      .pipe(
        map(data => data.toLocaleString())
      );

    this.totalMen$ = this.vaccinationService.getTotalMen()
      .pipe(
        map(data => data.toLocaleString())
      );

    this.totalWomen$ = this.vaccinationService.getTotalWomen()
      .pipe(
        map(data => data.toLocaleString())
      );

    this.lastUpdate$ = this.vaccinationService.getLastUpdate();

    this.vaccinationService.getVaccinationsPerDay()
        .subscribe(v => {
          this.todayVaccination = v[v.length - 1];
        });
  }

}
