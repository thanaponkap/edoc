import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'myfilterpipe'
})
export class MyfilterpipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
