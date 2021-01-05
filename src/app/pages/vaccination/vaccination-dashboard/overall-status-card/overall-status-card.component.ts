import { Component, Input, OnInit } from '@angular/core';
import { VaccinationDistrictOverallStatus } from '../../models/vaccination-district-overall-status';

@Component({
  selector: 'app-overall-status-card',
  templateUrl: './overall-status-card.component.html',
  styleUrls: ['./overall-status-card.component.scss']
})
export class OverallStatusCardComponent implements OnInit {

  @Input()
  data: VaccinationDistrictOverallStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
