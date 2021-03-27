import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItalianVaccinationService } from 'src/app/commons/services/italian-vaccination.service';

@Component({
  selector: 'app-vaccination-last-update',
  templateUrl: './vaccination-last-update.component.html',
  styleUrls: ['./vaccination-last-update.component.scss']
})
export class VaccinationLastUpdateComponent implements OnInit {

  lastUpdate$: Observable<Date>;

  constructor(private vaccinationService: ItalianVaccinationService) { }

  ngOnInit(): void {
    this.lastUpdate$ = this.vaccinationService.getLastUpdate();
  }

}
