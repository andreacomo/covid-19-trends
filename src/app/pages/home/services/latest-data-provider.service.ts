import { Injectable } from '@angular/core';
import { DistrictData } from 'src/app/commons/models/district-data';
import { EnrichedData } from '../models/enriched-data';
import { MeanData } from '../models/mean-data';
import { EnrichedDataGroup } from '../models/enriched-district-data-group';
import { HasTotalCases } from 'src/app/commons/models/has-total-cases';

@Injectable()
export class LatestProviderService {

  constructor() { }

  public createDataTotalCases<T extends HasTotalCases>(data: {[district: string]: T[]}): EnrichedDataGroup<T> {
    return Object.keys(data).reduce((ret, district) => {
      ret[district] = this.createDiffWithPreviousDay<T>(data[district], 'totale_casi');
      return ret;
    }, {} as EnrichedDataGroup<T>);
  }

  public createMeanDataDiffTotalCases<T>(data: EnrichedDataGroup<T>): {[district: string]: MeanData} {
    return Object.keys(data).reduce((ret, district) => {
      ret[district] = this.createMeanDataOn<EnrichedData>(data[district], 'diff_totale_casi');
      return ret;
    }, {} as {[district: string]: (MeanData)});
  }

  public createMeanDataOn<T>(values: T[], attribute: string): MeanData {
    const mean = values.reduce((acc, i) => acc + (i[attribute] / values.length), 0);
    return new MeanData(
      mean,
      this.calculateMeanOffset(mean, .25),
      this.calculateMeanOffset(mean, -.25)
    );
  }

  private calculateMeanOffset(mean: number, offset: number): number {
    return mean * (1 + offset);
  }

  public createDiffWithPreviousDay<T extends HasTotalCases>(values: T[], ...attributes: string[]): (T & EnrichedData)[] {
    const latestValues = values.slice(values.length - 4);
    let index = 0;
    return latestValues
      .map(v => {
        if (index > 0) {
          const enrichment = attributes.reduce((acc, attribute) => {
            const current = latestValues[index][attribute];
            const previous = latestValues[index - 1][attribute];
            return {
              ...acc,
              ['diff_' + attribute]: current - previous,
              ['diff_percent_' + attribute]: ((current - previous) / previous) * 100
            };
          }, {});
          index++;
          return {
            ...v,
            ...enrichment
          };
        } else {
          index++;
          return null;
        }
      })
      .filter(v => v != null);
  }
}
