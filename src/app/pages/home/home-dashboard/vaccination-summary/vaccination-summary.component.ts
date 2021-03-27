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

  total: number;

  firstDoseTotal: number;

  secondDoseTotal: number;

  todayVaccination: VaccinationPerDay;

  constructor(private vaccinationService: ItalianVaccinationService) { }

  ngOnInit(): void {
    this.vaccinationService.getVaccinationsPerDay()
        .subscribe(vaccinations => {
          this.todayVaccination = vaccinations[vaccinations.length - 1];
          this.total = vaccinations.reduce((acc, v) => acc + v.doses.total, 0);
          this.firstDoseTotal = vaccinations.reduce((acc, v) => acc + v.doses.first, 0);
          this.secondDoseTotal = vaccinations.reduce((acc, v) => acc + v.doses.second, 0);
        });
  }

}
