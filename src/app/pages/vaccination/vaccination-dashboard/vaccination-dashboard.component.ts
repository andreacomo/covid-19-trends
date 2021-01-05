import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VaccinationService } from 'src/app/commons/services/vaccination.service';
import { VaccinationDistrictStatus } from '../models/vaccination-district-status';

@Component({
  selector: 'app-vaccination-dashboard',
  templateUrl: './vaccination-dashboard.component.html',
  styleUrls: ['./vaccination-dashboard.component.scss']
})
export class VaccinationDashboardComponent implements OnInit {

  lastUpdate$: Observable<Date>;

  districtsStatus: VaccinationDistrictStatus[];

  constructor(private vaccinationService: VaccinationService) { }

  ngOnInit(): void {
    this.lastUpdate$ = this.vaccinationService.getLastUpdate();
    this.vaccinationService.getVaccinationDistrictsStatus()
      .subscribe(data => this.districtsStatus = data.details);
  }

}
