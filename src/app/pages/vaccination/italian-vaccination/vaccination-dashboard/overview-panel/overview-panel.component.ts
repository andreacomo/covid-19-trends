import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VaccinableAgeGroupAudience } from 'src/app/commons/models/vaccinable-age-group-audience';
import { VaccinableDistrictAudience } from 'src/app/commons/models/vaccinable-district-audience';
import { ItalianVaccinationService } from 'src/app/commons/services/italian-vaccination.service';
import { VaccinationAgeGroup } from '../../models/vaccination-age-group';
import { VaccinationDistrictOverallStatus } from '../../models/vaccination-district-overall-status';
import { VaccinationDoses } from '../../models/vaccination-doses';
import { VaccinationPerDay } from '../../models/vaccination-per-day';
import { VaccinesDeliveryDatesPerSupplier } from '../../models/vaccines-delivery-dates-per-supplier';

@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrls: ['./overview-panel.component.scss']
})
export class OverviewPanelComponent implements OnInit {

  lastUpdate$: Observable<Date>;

  overallStatus$: Observable<VaccinationDistrictOverallStatus>;

  ageGroups$: Observable<VaccinationAgeGroup[]>;

  totalDoses$: Observable<VaccinationDoses>;

  audiencePerDistrict$: Observable<VaccinableDistrictAudience[]>;

  audiencePerAge$: Observable<VaccinableAgeGroupAudience[]>;

  deliveriesInTime$: Observable<VaccinesDeliveryDatesPerSupplier[]>;

  vaccinationsPerDay$: Observable<VaccinationPerDay[]>;

  constructor(private vaccinationService: ItalianVaccinationService) { }

  ngOnInit(): void {
    this.lastUpdate$ = this.vaccinationService.getLastUpdate();
    this.overallStatus$ = this.vaccinationService.getVaccinationDistrictsStatus();
    this.ageGroups$ = this.vaccinationService.getAgeGroups();
    this.totalDoses$ = this.vaccinationService.getVaccinationDoses();
    this.audiencePerDistrict$ = this.vaccinationService.getVaccinableDistrictAudience();
    this.audiencePerAge$ = this.vaccinationService.getVaccinableAgeGroupAudience();
    this.deliveriesInTime$ = this.vaccinationService.getVaccinesDeliveryInTime();
    this.vaccinationsPerDay$ = this.vaccinationService.getVaccinationsPerDay();
  }

}
