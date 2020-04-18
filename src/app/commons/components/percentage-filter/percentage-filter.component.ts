import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProvincePercentageFilter } from '../../models/province-percentage-filter';
import { LocalDataService } from '../../services/local-data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-percentage-filter',
  templateUrl: './percentage-filter.component.html',
  styleUrls: ['./percentage-filter.component.scss']
})
export class PercentageFilterComponent implements OnInit {

  @Output()
  selectFilter: EventEmitter<ProvincePercentageFilter> = new EventEmitter<ProvincePercentageFilter>();

  private filter: Promise<ProvincePercentageFilter>;

  constructor(private localData: LocalDataService) { }

  ngOnInit() {
    this.filter = this.localData.getProvincesPopulation()
      .pipe(
        map(pop => new ProvincePercentageFilter(pop, 'totale_casi'))
      )
      .toPromise();
  }

  select(choice: string) {
    switch (choice) {
      case 'pop_percent':
        this.filter.then(f => this.selectFilter.next(f));
        break;
      default:
        this.selectFilter.next();
    }
  }
}
