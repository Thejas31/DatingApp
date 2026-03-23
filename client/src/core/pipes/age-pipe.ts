import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: string): number {
    const today = new Date();
    const Dob = new Date(value);
    let age = today.getFullYear() - Dob.getFullYear();
    const m = today.getMonth() - Dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < Dob.getDate())) {
      age--;
    }
    return age;
  }
}
