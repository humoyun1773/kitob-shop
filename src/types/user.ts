import { DeliveryAddress } from './order';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar?: string;
  savedAddresses: DeliveryAddress[];
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  fixedDiscount?: number;
  minSpend?: number;
  validUntil: string;
  description: string;
}
