import { Injectable } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { EnrichedDistrict } from '../models/enriched-district';
import { MeanData } from '../models/mean-data';

@Injectable()
export class DistrictLatestProviderService {

  constructor() { }

  public createData(data: {[district: string]: DistrictData[]}): {[district: string]: (DistrictData & EnrichedDistrict)[]} {
    return Object.keys(data).reduce((ret, district) => {
      ret[district] = this.createDiffWithPreviousDay(data[district]);
      return ret;
    }, {} as {[district: string]: (DistrictData & EnrichedDistrict)[]});
  }

  public createMeanData(data: {[district: string]: (DistrictData & EnrichedDistrict)[]}): {[district: string]: MeanData} {
    return Object.keys(data).reduce((ret, district) => {
      const mean = data[district].reduce((acc, i) => acc + (i.diff_casi / data[district].length), 0);
      ret[district] = {
        mean,
        superMean: this.calculateMeanOffset(mean, .25),
        subMean: this.calculateMeanOffset(mean, -.25)
      };
      return ret;
    }, {} as {[district: string]: (MeanData)});
  }

  private calculateMeanOffset(mean: number, offset: number): number {
    return mean * (1 + offset);
  }

  private createDiffWithPreviousDay(values: DistrictData[]): (DistrictData & EnrichedDistrict)[] {
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
