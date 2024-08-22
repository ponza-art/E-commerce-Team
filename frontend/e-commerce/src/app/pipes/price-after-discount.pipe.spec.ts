import { PriceAfterDiscountPipe } from './price-after-discount.pipe';

describe('PriceAfterDiscountPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceAfterDiscountPipe();
    expect(pipe).toBeTruthy();
  });
});
