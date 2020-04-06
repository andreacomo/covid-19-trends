import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TimeFilter } from '../../models/time-filter';
import { DataFilterProviderService } from '../../services/data-filter-provider.service';

@Component({
  selector: 'app-time-filter',
  templateUrl: './time-filter.component.html',
  styleUrls: ['./time-filter.component.scss']
})
export class TimeFilterComponent implements OnInit {

  @Output()
  selectFilter: EventEmitter<TimeFilter> = new EventEmitter<TimeFilter>();

  private timeFilters: {[scope: string]: TimeFilter};

  constructor(private filterProvider: DataFilterProviderService) { }

  ngOnInit() {
    this.timeFilters = this.filterProvider.getAllTimeFilters();
  }

  select(filterKey: string) {
    this.selectFilter.next(this.timeFilters[filterKey]);
  }

}
