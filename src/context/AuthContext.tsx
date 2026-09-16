import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { DeliveryAddress } from '../types/order';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: DeliveryAddress) => void;
  switchRole: () => void;
}

const DEFAULT_USER: User = {
  id: 'usr-101',
  name: 'Humoyun Mirzo',
  email: 'humoyun@kitobshop.uz',
  phone: '+998 90 123 45 67',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  savedAddresses: [
    {
      country: "O'zbekiston",
      region: 'Toshkent shahri',
      city: 'Toshkent',
      district: 'Yunusobod',
      street: "Amir Temur ko'chasi",
      house: '42-uy',
      apartment: '15-xonadon',
      postalCode: '100084',
      recipientName: 'Humoyun Mirzo',
      recipientPhone: '+998 90 123 45 67'
    }
  ],
  createdAt: '2026-01-01T00:00:00Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('kitob_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('kitob_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kitob_user');
    }
  }, [user]);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    const role = email.includes('admin') ? 'admin' : 'customer';
    const loggedUser: User = {
      id: 'usr-' + Date.now().toString().slice(-4),
      name: email.split('@')[0] || 'Kitobxon',
      email,
      phone: '+998 90 999 88 77',
      role: role as 'customer' | 'admin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      savedAddresses: DEFAULT_USER.savedAddresses,
      createdAt: new Date().toISOString()
    };
    setUser(loggedUser);
    return true;
  };

  const register = async (name: string, email: string, _pass: string): Promise<boolean> => {
    const newUser: User = {
      id: 'usr-' + Date.now().toString().slice(-4),
      name,
      email,
      role: 'customer',
      savedAddresses: [],
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const addAddress = (address: DeliveryAddress) => {
    if (!user) return;
    const updated = [...user.savedAddresses, address];
    setUser({ ...user, savedAddresses: updated });
  };

  const switchRole = () => {
    if (!user) return;
    const nextRole = user.role === 'admin' ? 'customer' : 'admin';
    setUser({ ...user, role: nextRole });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
