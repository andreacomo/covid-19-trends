import { Injectable } from '@angular/core';
import { ChartDataType } from '../models/chart-data-type';

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
      lineDash: [],
      tooltipFooter: ChartDataType.prototype.tooltipFooter
    }, {
      label: 'Tamponi',
      value: 'tamponi',
      active: false,
      transformer: (values) => values.map(v => v.tamponi),
      lineDash: [15, 5],
      tooltipFooter: ChartDataType.prototype.tooltipFooter
    }, {
      label: 'Decessi',
      value: 'decessi',
      active: false,
      transformer: (values) => values.map(v => v.deceduti),
      lineDash: [3, 3],
      tooltipFooter: ChartDataType.prototype.tooltipFooter
    }, {
      label: 'Dimessi guariti',
      value: 'dimessi',
      active: false,
      transformer: (values) => values.map(v => v.dimessi_guariti),
      lineDash: [10, 2, 2, 2],
      tooltipFooter: ChartDataType.prototype.tooltipFooter
    }, {
      label: 'Ricoverati',
      value: 'ricoverati',
      active: false,
      transformer: (values) => values.map(v => v.ricoverati_con_sintomi),
      lineDash: [3, 6, 3, 6],
      tooltipFooter: ChartDataType.prototype.tooltipFooter
    }, {
      label: 'Terapia intensiva',
      value: 'terapia_intensiva',
      active: false,
      transformer: (values) => values.map(v => v.terapia_intensiva),
      lineDash: [4, 4, 2, 4],
      tooltipFooter: ChartDataType.prototype.tooltipFooter
    }, {
      label: 'Casi totali su % popolazione',
      value: 'totale_casi_perc_pop',
      active: false,
      transformer: (values) => values.map(v => {
        return v.totale_casi;
      }),
      lineDash: [4, 1, 1],
      tooltipFooter: ChartDataType.prototype.tooltipFooter
    }];

    this.typesAsMap = this.types.reduce((acc, t) => {
      acc[t.value] = t;
      return acc;
    }, {});
   }

  getAll(): ChartDataType[] {
    return this.types;
  }

  getMany(types: string[]): ChartDataType[] {
    return types.map(type => this.typesAsMap[type]);
  }

  get(type: string): ChartDataType {
    return this.typesAsMap[type];
  }
}
