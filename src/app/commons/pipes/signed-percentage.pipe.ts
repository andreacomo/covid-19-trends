import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signedPercentage'
})
export class SignedPercentagePipe implements PipeTransform {

  transform(value: number, ...args: number[]): string {
    return (value > 0 ? `+${this.toFixed(value, args[0])}` : this.toFixed(value, args[0])) + '%';
  }

  private toFixed(value: number, precision: number): string {
    return value.toFixed(precision || 2);
  }

}
