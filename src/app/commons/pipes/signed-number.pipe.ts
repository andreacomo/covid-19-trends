import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signedNumber'
})
export class SignedNumberPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    return value > 0 ? `+${value}` : value.toString() || null;
  }

}
