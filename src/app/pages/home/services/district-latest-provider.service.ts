import { Injectable } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';

@Injectable()
export class DistrictLatestProviderService {

  constructor() { }

  public createData(data: {[name: string]: DistrictData[]}): (DistrictData & {diff_casi: number, diff_casi_percent: number})[] {
    return Object.keys(data).reduce((ret, key) => {
      ret[key] = this.createDiffWithPreviousDay(data[key]);
      return ret;
    }, {} as (DistrictData & {diff_casi: number, diff_casi_percent: number})[]);
  }

  private createDiffWithPreviousDay(values: DistrictData[]): (DistrictData & {diff_casi: number, diff_casi_percent: number})[] {
    const latestValues = values.slice(values.length - 4);
    let index = 0;
    return latestValues
      .map(v => {
        if (index > 0) {
          const current = latestValues[index].totale_casi;
          const previous = latestValues[index - 1].totale_casi;
          const newValue = {
            ...v,
            diff_casi: current - previous,
            diff_casi_percent: ((current - previous) / previous) * 100
          };
          index++;
          return newValue;
        } else {
          index++;
          return null;
        }
      })
      .filter(v => v != null);
  }
}
