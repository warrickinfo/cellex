import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  specs: Record<string, string>;
  stock: number;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cellex-cart',
    }
  )
);

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'cellex-auth',
    }
  )
);

interface UserStore {
  users: User[];
  registerUser: (user: Omit<User, 'id' | 'createdAt' | 'role'>) => void;
  findUser: (email: string) => User | undefined;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [
        {
          id: 'admin-1',
          name: 'Admin',
          email: 'admin@cellex.com',
          phone: '0000000000',
          password: 'admin123',
          role: 'admin',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'admin-2',
          name: 'Arvin Hanif',
          email: 'arvin_hanif',
          phone: '0000000000',
          password: 'arvin_hanif',
          role: 'admin',
          createdAt: new Date().toISOString(),
        }
      ],
      registerUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substring(7),
          role: 'user',
          createdAt: new Date().toISOString(),
        };
        set({ users: [...get().users, newUser] });
      },
      findUser: (email) => {
        return get().users.find((u) => u.email === email);
      },
    }),
    {
      name: 'cellex-users',
    }
  )
);

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  createdAt: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'Pending',
          createdAt: new Date().toISOString(),
        };
        set({ orders: [newOrder, ...get().orders] });
      },
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        });
      },
    }),
    {
      name: 'cellex-orders',
    }
  )
);

interface ThemeStore {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'cellex-theme',
    }
  )
);
