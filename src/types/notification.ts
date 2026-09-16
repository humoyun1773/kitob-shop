export type NotificationType = 'order' | 'promotion' | 'system';

export interface UserNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  orderId?: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}
