import { Injectable } from '@angular/core';
import { TimeFilter } from '../models/time-filter';

@Injectable({
  providedIn: 'root'
})
export class DataFilterProviderService {

  private timeFilters: {[scope: string]: TimeFilter} = {
    '3d': {
      scope: '3d',
      apply: (values: any[]) => values.slice(values.length - 3)
    },
    '7d': {
      scope: '7d',
      apply: (values: any[]) => values.slice(values.length - 7)
    },
    '14d': {
      scope: '14d',
      apply: (values: any[]) => values.slice(values.length - 14)
    },
    '30d': {
      scope: '30d',
      apply: (values: any[]) => values.slice(values.length - 30)
    },
    all: {
      scope: 'all',
      apply: (values: any[]) => values
    }
  };

  constructor() { }

  getAllTimeFilters(): {[scope: string]: TimeFilter} {
    return this.timeFilters;
  }

  getTimeFilterByScope(scope: string): TimeFilter {
    return this.timeFilters[scope];
  }
}
