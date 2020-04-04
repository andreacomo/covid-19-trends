import { Trend } from './trend';

export class MeanData {

    constructor(public mean: number, public superMean: number, public subMean: number) {}

    trendOf(value: number): Trend {
        if (value <= this.subMean) {
            return Trend.MARKED_IMPROVEMENT;
          } else if (value > this.subMean && value <= this.mean) {
            return Trend.IMPROVEMENT;
          } else if (value > this.mean && value <= this.superMean) {
            return Trend.DETERIORATION;
          } else { // value > this.meanData[district].superMean
            return Trend.SHARP_DETERIORATION;
          }
    }
}
