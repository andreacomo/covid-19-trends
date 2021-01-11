import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorldVaccinationStatus } from '../models/world-vaccination-status';
import { WorldVaccinationService } from '../services/world-vaccination.service';

@Component({
  selector: 'app-world-vaccination-dashboard',
  templateUrl: './world-vaccination-dashboard.component.html',
  styleUrls: ['./world-vaccination-dashboard.component.scss']
})
export class WorldVaccinationDashboardComponent implements OnInit {

  worldData$: Observable<WorldVaccinationStatus[]>;

  constructor(private vaccinationService: WorldVaccinationService) { }

  ngOnInit(): void {
    this.worldData$ = this.vaccinationService.getWorldVaccination();
  }

}
