import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SimpleRouteInfo } from '../models/simple-route-changes';

// tslint:disable-next-line:ban-types
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogeAnalyticsService {

  constructor() { }

  public emitPageChange(routeInfo: SimpleRouteInfo) {
    if (gtag) {
      gtag('config', environment.gtag, {
        page_path: routeInfo.path,
        page_title: routeInfo.title
      });
    }
  }

  public emitEvent(action: string, label: string, category: Category) {
    if (gtag) {
      gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  }
}

export enum Category {
  INTERACTION = 'interaction',
  CHART_TYPE_SWITCH = 'chart_type_switch'
}

