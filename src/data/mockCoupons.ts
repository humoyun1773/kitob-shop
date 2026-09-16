import { Coupon } from '../types/user';

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'SAVE20',
    discountPercent: 20,
    validUntil: '2026-12-31',
    description: '20% discount on all orders'
  },
  {
    code: 'KITOB10',
    discountPercent: 10,
    validUntil: '2026-12-31',
    description: '10% discount for book lovers'
  },
  {
    code: 'WELCOME5',
    fixedDiscount: 5,
    minSpend: 25,
    validUntil: '2026-12-31',
    description: '$5 off on orders over $25'
  }
];
