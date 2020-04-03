import { Injectable } from '@angular/core';
import { ChartDataType } from '../components/line-chart/line-chart.component';

@Injectable({
  providedIn: 'root'
})
export class LinearChartDataTypeProvider {

  private types: ChartDataType[];

  private typesAsMap: {[type: string]: ChartDataType};

  constructor() {
    this.types = [{
      label: 'Casi totali',
      value: 'totale_casi',
      active: true,
      transformer: (values) => values.map(v => v.totale_casi),
      lineDash: []
    }, {
      label: 'Tamponi',
      value: 'tamponi',
      active: false,
      transformer: (values) => values.map(v => v.tamponi),
      lineDash: [15, 5]
    }, {
      label: 'Decessi',
      value: 'decessi',
      active: false,
      transformer: (values) => values.map(v => v.deceduti),
      lineDash: [3, 3]
    }, {
      label: 'Dimessi guariti',
      value: 'dimessi',
      active: false,
      transformer: (values) => values.map(v => v.dimessi_guariti),
      lineDash: [10, 2, 2, 2]
    }, {
      label: 'Ricoverati',
      value: 'ricoverati',
      active: false,
      transformer: (values) => values.map(v => v.ricoverati_con_sintomi),
      lineDash: [3, 6, 3, 6]
    }, {
      label: 'Terapia intensiva',
      value: 'terapia_intensiva',
      active: false,
      transformer: (values) => values.map(v => v.terapia_intensiva),
      lineDash: [4, 4, 2, 4]
    }];

    this.typesAsMap = this.types.reduce((acc, t) => {
      acc[t.value] = t;
      return acc;
    }, {});
   }

  getAll(): ChartDataType[] {
    return this.types;
  }

  get(type: string) {
    return this.typesAsMap[type];
  }
}
