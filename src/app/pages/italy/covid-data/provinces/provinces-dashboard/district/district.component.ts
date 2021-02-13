import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { DpcCovid19Service } from 'src/app/commons/services/dpc-covid19.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  @Input()
  districtName: string;

  @Output()
  selected: EventEmitter<string> = new EventEmitter<string>();

  districts$: Observable<string[]>;

  constructor(private github: DpcCovid19Service) { }

  ngOnInit() {
    this.districts$ = this.github.getDistricts()
      .pipe(
        map(data => {
          return data.map(d => d.denominazione_regione);
        }),
        tap(districts => {
          if (!this.districtName) {
            setTimeout(() => {
              this.selected.next(districts[0]);
            });
          }
        })
      );
  }

  onChange(event) {
    this.selected.next(event.value);
  }

}
