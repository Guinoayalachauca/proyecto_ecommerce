export enum Category {
  FRUITS = 'Frutas',
  VEGETABLES = 'Verduras',
  DAIRY = 'Lácteos',
  PANTRY = 'Despensa',
  BAKERY = 'Panadería',
  MEAT = 'Carnes'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  unit: string; // e.g., 'kg', 'unidad', 'paquete'
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}