import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VaccinationService } from 'src/app/commons/services/vaccination.service';

@Component({
  selector: 'app-vaccination-summary',
  templateUrl: './vaccination-summary.component.html',
  styleUrls: ['./vaccination-summary.component.scss']
})
export class VaccinationSummaryComponent implements OnInit {

  total$: Observable<string>;

  totalMen$: Observable<string>;

  totalWomen$: Observable<string>;

  lastUpdate$: Observable<Date>;

  constructor(private vaccinationService: VaccinationService) { }

  ngOnInit(): void {
    this.total$ = this.vaccinationService.getTotal()
      .pipe(
        map(data => data.toLocaleString())
      );

    this.totalMen$ = this.vaccinationService.getTotalMen()
      .pipe(
        map(data => data.toLocaleString())
      );

    this.totalWomen$ = this.vaccinationService.getTotalWomen()
      .pipe(
        map(data => data.toLocaleString())
      );

    this.lastUpdate$ = this.vaccinationService.getLastUpdate();
  }

}