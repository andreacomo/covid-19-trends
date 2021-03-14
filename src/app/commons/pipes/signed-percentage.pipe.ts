import { Pipe, PipeTransform } from '@angular/core';
import { Numbers } from '../models/numbers';

@Pipe({
  name: 'signedPercentage'
})
export class SignedPercentagePipe implements PipeTransform {

  transform(value: number, ...args: number[]): string {
    return Numbers.appendPercentWithSignAndPrecision(value, args[0]);
  }

  private toFixed(value: number, precision: number): string {
    return value.toFixed(precision || 2);
  }

}
