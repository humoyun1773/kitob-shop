import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types/order';
import { INITIAL_BOOKS } from '../data/mockBooks';

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'timeline' | 'trackingNumber'>) => Order;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getUserOrders: (userId?: string) => Order[];
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'BK-20260916-001',
    userId: 'usr-101',
    customerName: 'Humoyun Mirzo',
    customerEmail: 'humoyun@kitobshop.uz',
    customerPhone: '+998 90 123 45 67',
    items: [
      {
        bookId: INITIAL_BOOKS[0].id,
        book: INITIAL_BOOKS[0],
        quantity: 1,
        price: INITIAL_BOOKS[0].price
      },
      {
        bookId: INITIAL_BOOKS[1].id,
        book: INITIAL_BOOKS[1],
        quantity: 1,
        price: INITIAL_BOOKS[1].price
      }
    ],
    subtotal: 31.49,
    discount: 6.30,
    couponCode: 'SAVE20',
    deliveryFee: 0,
    tax: 0.50,
    total: 25.69,
    paymentMethod: 'Bank Card',
    paymentCardLast4: '4242',
    paymentStatus: 'completed',
    orderStatus: 'Shipped',
    deliveryAddress: {
      country: "O'zbekiston",
      region: 'Toshkent',
      city: 'Toshkent',
      district: 'Yunusobod',
      street: "Amir Temur ko'chasi",
      house: '42-uy',
      apartment: '15-xonadon',
      postalCode: '100084',
      recipientName: 'Humoyun Mirzo',
      recipientPhone: '+998 90 123 45 67'
    },
    deliveryMethod: 'express',
    estimatedDelivery: 'September 20–22',
    trackingNumber: 'TRK-982341-UZ',
    timeline: [
      {
        status: 'Order placed',
        date: '2026-09-16',
        time: '14:20',
        completed: true,
        notes: 'Buyurtma tizimga qabul qilindi'
      },
      {
        status: 'Payment confirmed',
        date: '2026-09-16',
        time: '14:21',
        completed: true,
        notes: "To'lov karta orqali tasdiqlandi (**** 4242)"
      },
      {
        status: 'Processing',
        date: '2026-09-16',
        time: '15:00',
        completed: true,
        notes: "Ombordan buyurtma kitoblari yig'ilmoqda"
      },
      {
        status: 'Packed',
        date: '2026-09-17',
        time: '09:10',
        completed: true,
        notes: 'Mahsulotlar ehtiyotkorlik bilan qadoqlandi'
      },
      {
        status: 'Shipped',
        date: '2026-09-17',
        time: '11:45',
        completed: true,
        notes: 'Kuryer xizmatiga topshirildi'
      },
      {
        status: 'Out for delivery',
        date: '2026-09-18',
        time: '09:00',
        completed: false,
        notes: "Kuryer yetkazish uchun yo'lga chiqdi"
      },
      {
        status: 'Delivered',
        date: '2026-09-18',
        time: '15:00',
        completed: false,
        notes: 'Mijoz qabul qilib oldi'
      }
    ],
    createdAt: '2026-09-16T14:20:00Z',
    updatedAt: '2026-09-17T11:45:00Z'
  }
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('kitob_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('kitob_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'timeline' | 'trackingNumber'>): Order => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().slice(0, 5);
    const orderId = `BK-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      trackingNumber: `TRK-${Math.floor(100000 + Math.random() * 900000)}-UZ`,
      timeline: [
        {
          status: 'Order placed',
          date: dateStr,
          time: timeStr,
          completed: true,
          notes: 'Buyurtma tizimga muvaffaqiyatli qabul qilindi'
        },
        {
          status: 'Payment confirmed',
          date: dateStr,
          time: timeStr,
          completed: true,
          notes: `To'lov muvaffaqiyatli amalga oshirildi (${orderData.paymentMethod})`
        },
        {
          status: 'Processing',
          date: dateStr,
          time: timeStr,
          completed: true,
          notes: "Buyurtma kitob omboriga jo'natildi"
        },
        {
          status: 'Packed',
          date: '',
          time: '',
          completed: false,
          notes: 'Qadoqlash kutilmoqda'
        },
        {
          status: 'Shipped',
          date: '',
          time: '',
          completed: false,
          notes: 'Kuryerga berilishi kutilmoqda'
        },
        {
          status: 'Out for delivery',
          date: '',
          time: '',
          completed: false,
          notes: 'Yetkazuvchi tayinlanishi kutilmoqda'
        },
        {
          status: 'Delivered',
          date: '',
          time: '',
          completed: false,
          notes: 'Qabul qilinishi kutilmoqda'
        }
      ],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(o => o.id.toLowerCase() === id.toLowerCase());
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().slice(0, 5);

    setOrders(prev =>
      prev.map(order => {
        if (order.id.toLowerCase() !== orderId.toLowerCase()) return order;

        const updatedTimeline = order.timeline.map(step => {
          if (step.status === status) {
            return {
              ...step,
              completed: true,
              date: dateStr,
              time: timeStr,
              notes: note || step.notes
            };
          }
          return step;
        });

        return {
          ...order,
          orderStatus: status,
          timeline: updatedTimeline,
          updatedAt: now.toISOString()
        };
      })
    );
  };

  const getUserOrders = (userId?: string): Order[] => {
    if (!userId) return orders;
    return orders.filter(o => o.userId === userId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus,
        getUserOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
