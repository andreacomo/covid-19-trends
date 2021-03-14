import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    return value.split('T')[0];
  }

}
