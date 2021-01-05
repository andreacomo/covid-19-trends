import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VaccinationService } from 'src/app/commons/services/vaccination.service';
import { VaccinationDistrictOverallStatus } from '../models/vaccination-district-overall-status';
import { VaccinationDistrictStatus } from '../models/vaccination-district-status';

@Component({
  selector: 'app-vaccination-dashboard',
  templateUrl: './vaccination-dashboard.component.html',
  styleUrls: ['./vaccination-dashboard.component.scss']
})
export class VaccinationDashboardComponent implements OnInit {

  lastUpdate$: Observable<Date>;

  overallStatus$: Observable<VaccinationDistrictOverallStatus>;

  constructor(private vaccinationService: VaccinationService) { }

  ngOnInit(): void {
    this.lastUpdate$ = this.vaccinationService.getLastUpdate();
    this.overallStatus$ = this.vaccinationService.getVaccinationDistrictsStatus();
  }

}
