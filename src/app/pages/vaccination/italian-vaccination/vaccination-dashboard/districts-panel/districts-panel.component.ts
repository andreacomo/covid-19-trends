import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DistrictPopulation } from 'src/app/commons/models/district-population';
import { ItalianVaccinationCategories } from 'src/app/commons/models/italian-vaccination-category';
import { ItalianVaccinationService } from 'src/app/commons/services/italian-vaccination.service';
import { LocalDataService } from 'src/app/commons/services/local-data.service';
import { VaccinationDistrictOverallStatus } from '../../models/vaccination-district-overall-status';
import { VaccinesDeliveryPerSupplierInDistricts } from '../../models/vaccines-delivery-per-supplier-in-districts';

@Component({
  selector: 'app-districts-panel',
  templateUrl: './districts-panel.component.html',
  styleUrls: ['./districts-panel.component.scss']
})
export class DistrictsPanelComponent implements OnInit {

  overallStatus$: Observable<VaccinationDistrictOverallStatus>;

  deliveriesInDistricts$: Observable<VaccinesDeliveryPerSupplierInDistricts[]>;

  districtsPopulation$: Observable<DistrictPopulation[]>;

  groupsPerDistricts$: Observable<ItalianVaccinationCategories>;

  constructor(private vaccinationService: ItalianVaccinationService,
              private localDataService: LocalDataService) { }

  ngOnInit(): void {
    this.overallStatus$ = this.vaccinationService.getVaccinationDistrictsStatus();
    this.deliveriesInDistricts$ = this.vaccinationService.getVaccinesDeliveriesInDistricts();
    this.districtsPopulation$ = this.localDataService.getDistrictsPopulation();
    this.groupsPerDistricts$ = this.vaccinationService.getCategoryGroupsPerDistricts();
  }

}
