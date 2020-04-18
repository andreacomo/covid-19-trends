import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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

  @Input()
  selectedFilter: TimeFilter;

  @Input()
  timeFilters: TimeFilter[];

  constructor(private filterProvider: DataFilterProviderService) { }

  ngOnInit() {
    this.timeFilters = Object.values(this.filterProvider.getAllTimeFilters());
  }

  select(filter: TimeFilter) {
    this.selectFilter.next(filter);
  }

}
