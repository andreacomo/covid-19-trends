import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VaccinationService } from 'src/app/commons/services/vaccination.service';
import { VaccinationAgeGroup } from '../models/vaccination-age-group';
import { VaccinationCategoryGroup } from '../models/vaccination-category-group';
import { VaccinationDistrictOverallStatus } from '../models/vaccination-district-overall-status';
import { VaccinationDistrictStatus } from '../models/vaccination-district-status';

@Component({
  selector: 'app-italian-vaccination-dashboard',
  templateUrl: './italian-vaccination-dashboard.component.html',
  styleUrls: ['./italian-vaccination-dashboard.component.scss']
})
export class ItalianVaccinationDashboardComponent implements OnInit {

  lastUpdate$: Observable<Date>;

  overallStatus$: Observable<VaccinationDistrictOverallStatus>;

  ageGroups$: Observable<VaccinationAgeGroup[]>;

  categoryGroup$: Observable<VaccinationCategoryGroup[]>;

  constructor(private vaccinationService: VaccinationService) { }

  ngOnInit(): void {
    this.lastUpdate$ = this.vaccinationService.getLastUpdate();
    this.overallStatus$ = this.vaccinationService.getVaccinationDistrictsStatus();
    this.ageGroups$ = this.vaccinationService.getAgeGroups();
    this.categoryGroup$ = this.vaccinationService.getCategoryGroups();
  }

}
