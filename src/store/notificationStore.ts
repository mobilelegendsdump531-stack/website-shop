import { create } from 'zustand';
import { Notification } from '@/types';

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    const newNotification: Notification = {
      id: Math.random().toString(),
      ...notification,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
  },
  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
  markAsRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    }));
  },
  clearAll: () => set({ notifications: [] }),
}));
