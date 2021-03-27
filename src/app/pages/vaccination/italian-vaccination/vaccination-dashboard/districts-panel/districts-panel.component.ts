import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItalianVaccinationService } from 'src/app/commons/services/italian-vaccination.service';
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

  constructor(private vaccinationService: ItalianVaccinationService) { }

  ngOnInit(): void {
    this.overallStatus$ = this.vaccinationService.getVaccinationDistrictsStatus();
    this.deliveriesInDistricts$ = this.vaccinationService.getVaccinesDeliveriesInDistricts();
  }

}
