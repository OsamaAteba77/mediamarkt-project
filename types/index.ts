// Product Interface
 export interface IProduct {
  id: string;
  title: string;
  price: number;
  oldPrice?: number | null;
  description: string;
  category: string;
  brand?: string;
  imageUrl?: string;
  images?: string[];
  stock: number;
  badge?: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  specs?: Record<string, string>;
  comments?: Array<{
    user: string;
    date: string;
    rating: number;
    text: string;
  }>;
  colors?: string[]; // Hex codes or names
  insurance?: { name: string; price: number }[];
  clubPoints?: number;
  installment?: string; // e.g. "3 ay taksit"
}

// Category Interface
export interface ICategory {
    id: string;
    name: string;
    slug: string;
}

// User Profile Interface
export interface IUserProfile {
    uid: string;
    email: string;
    displayName: string;
    role: 'customer' | 'admin';
}

// Cart Item Interface
export interface ICartItem {
    product: IProduct;
    quantity: number;
}

// Order Interface
export interface IOrder {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    items: ICartItem[];
    totalPrice: number;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date | string; // Flexibility for Firebase Timestamp vs String
}