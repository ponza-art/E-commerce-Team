import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceAfterDiscount',
  standalone: true
})
export class PriceAfterDiscountPipe implements PipeTransform {

  transform(value: number, args: number): unknown {
    return (value - (args / 100) * value).toFixed(2);
  }

}
