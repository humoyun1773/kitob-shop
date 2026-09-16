import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserNotification } from '../types/notification';

interface NotificationContextType {
  notifications: UserNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notif: Omit<UserNotification, 'id' | 'createdAt' | 'isRead'>) => void;
  clearAll: () => void;
}

const INITIAL_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'notif-1',
    userId: 'usr-101',
    title: 'KitobShop ga xush kelibsiz!',
    message: "Ilk xaridingiz uchun SAVE20 promo-kodidan foydalaning va 20% chegirmaga ega bo'ling.",
    type: 'promotion',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'notif-2',
    userId: 'usr-101',
    title: 'Yangi bestsellerlar javonda',
    message: 'James Clear va Morgan Housel asarlari qayta sotuvga chiqarildi!',
    type: 'system',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<UserNotification[]>(() => {
    const saved = localStorage.getItem('kitob_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('kitob_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addNotification = (notif: Omit<UserNotification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotif: UserNotification = {
      ...notif,
      id: 'notif-' + Date.now(),
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
