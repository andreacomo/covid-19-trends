import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DistrictPopulation } from 'src/app/commons/models/district-population';
import { ItalianVaccinationService } from 'src/app/commons/services/italian-vaccination.service';
import { LocalDataService } from 'src/app/commons/services/local-data.service';
import { VaccinationAgeGroup } from '../models/vaccination-age-group';
import { VaccinationCategoryGroup } from '../models/vaccination-category-group';
import { VaccinationDistrictOverallStatus } from '../models/vaccination-district-overall-status';
import { VaccinationDoses } from '../models/vaccination-doses';

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

  totalDoses$: Observable<VaccinationDoses>;

  districtsPopulation$: Observable<DistrictPopulation[]>;

  constructor(private vaccinationService: ItalianVaccinationService,
              private localDataService: LocalDataService) { }

  ngOnInit(): void {
    this.lastUpdate$ = this.vaccinationService.getLastUpdate();
    this.overallStatus$ = this.vaccinationService.getVaccinationDistrictsStatus();
    this.ageGroups$ = this.vaccinationService.getAgeGroups();
    this.categoryGroup$ = this.vaccinationService.getCategoryGroups();
    this.totalDoses$ = this.vaccinationService.getVaccinationDoses();
    this.districtsPopulation$ = this.localDataService.getDistrictsPopulation();
  }

}
