import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const datePart = value.split('T')[0];
    const split = datePart.split('-');
    return `${split[2]}/${split[1]}`;
  }

}
