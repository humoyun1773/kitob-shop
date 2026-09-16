import { Book } from './book';

export type OrderStatus = 
  | 'Order placed'
  | 'Payment confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export type DeliveryMethodType = 'standard' | 'express' | 'pickup';

export interface DeliveryAddress {
  country: string;
  region: string;
  city: string;
  district: string;
  street: string;
  house: string;
  apartment?: string;
  postalCode: string;
  recipientName: string;
  recipientPhone: string;
}

export interface OrderItem {
  bookId: string;
  book: Book;
  quantity: number;
  price: number;
}

export interface StatusTimelineEvent {
  status: OrderStatus;
  date: string;
  time: string;
  completed: boolean;
  notes?: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: 'Bank Card' | 'Cash on Delivery';
  paymentCardLast4?: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  deliveryAddress: DeliveryAddress;
  deliveryMethod: DeliveryMethodType;
  estimatedDelivery: string;
  trackingNumber: string;
  timeline: StatusTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}
