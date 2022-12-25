import { Injectable } from '@angular/core';
import { TimeFilter } from '../models/time-filter';

@Injectable({
  providedIn: 'root'
})
export class DataFilterProviderService {

  private timeFilters: {[scope: string]: TimeFilter} = {
    '3d': {
      scope: '3d',
      label: 'Ultimi 3 giorni',
      icon: 'crop_portrait',
      apply: (values: any[]) => values.slice(values.length - 3)
    },
    '7d': {
      scope: '7d',
      label: 'Ultima settimana',
      icon: 'crop_square',
      apply: (values: any[]) => values.slice(values.length - 7)
    },
    '14d': {
      scope: '14d',
      label: 'Ultime 2 settimane',
      icon: 'crop_landscape',
      apply: (values: any[]) => values.slice(values.length - 14)
    },
    '30d': {
      scope: '30d',
      label: 'Ultimo mese',
      icon: 'crop_7_5',
      apply: (values: any[]) => values.slice(values.length - 30)
    },
    '60d': {
      scope: '60d',
      label: 'Ultimi due mesi',
      icon: 'crop_7_5',
      apply: (values: any[]) => values.slice(values.length - 60)
    },
    '120d': {
      scope: '120d',
      label: 'Ultimi quattro mesi',
      icon: 'crop_7_5',
      apply: (values: any[]) => values.slice(values.length - 120)
    },
    '180d': {
      scope: '120d',
      label: 'Ultimi sei mesi',
      icon: 'crop_7_5',
      apply: (values: any[]) => values.slice(values.length - 180)
    },
    '365d': {
      scope: '120d',
      label: 'Ultimo anno',
      icon: 'crop_7_5',
      apply: (values: any[]) => values.slice(values.length - 365)
    },
    '545d': {
      scope: '120d',
      label: 'Ultimo anno e mezzo',
      icon: 'crop_7_5',
      apply: (values: any[]) => values.slice(values.length - 545)
    },
    all: {
      scope: 'all',
      label: 'Dall\'inizio',
      icon: 'crop_free',
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
