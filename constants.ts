import { Product, Category } from './types';

export const APP_NAME = "MercadoFresco";
export const CURRENCY_SYMBOL = "$";

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Manzanas Rojas',
    price: 35.00,
    category: Category.FRUITS,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800',
    unit: 'kg',
    description: 'Manzanas frescas y crujientes, ideales para snacks.'
  },
  {
    id: '2',
    name: 'Plátano Tabasco',
    price: 18.50,
    category: Category.FRUITS,
    image: 'https://images.unsplash.com/photo-1571771896331-104b72399e38?auto=format&fit=crop&q=80&w=800',
    unit: 'kg',
    description: 'Plátanos dulces, fuente de potasio.'
  },
  {
    id: '3',
    name: 'Zanahorias',
    price: 12.00,
    category: Category.VEGETABLES,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=800',
    unit: 'kg',
    description: 'Zanahorias frescas, perfectas para ensaladas.'
  },
  {
    id: '4',
    name: 'Leche Entera',
    price: 26.00,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800',
    unit: 'litro',
    description: 'Leche fresca pasteurizada de vaca.'
  },
  {
    id: '5',
    name: 'Pan Integral',
    price: 45.00,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    unit: 'paquete',
    description: 'Pan de grano entero, rico en fibra.'
  },
  {
    id: '6',
    name: 'Arroz Blanco',
    price: 22.00,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    unit: 'kg',
    description: 'Arroz de grano largo premium.'
  },
  {
    id: '7',
    name: 'Pechuga de Pollo',
    price: 110.00,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=800',
    unit: 'kg',
    description: 'Pechuga sin hueso y sin piel.'
  },
  {
    id: '8',
    name: 'Aguacate Hass',
    price: 65.00,
    category: Category.VEGETABLES,
    image: 'https://images.unsplash.com/photo-1523049673856-606ae7e1e5eb?auto=format&fit=crop&q=80&w=800',
    unit: 'kg',
    description: 'Aguacate cremoso, listo para comer.'
  },
  {
    id: '9',
    name: 'Queso Panela',
    price: 55.00,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=800',
    unit: '400g',
    description: 'Queso fresco bajo en grasa.'
  },
  {
    id: '10',
    name: 'Aceite de Oliva',
    price: 120.00,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
    unit: 'botella',
    description: 'Aceite de oliva extra virgen importado.'
  },
  {
    id: '11',
    name: 'Jitomate Saladet',
    price: 19.90,
    category: Category.VEGETABLES,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
    unit: 'kg',
    description: 'Jitomate rojo maduro para salsas.'
  },
  {
    id: '12',
    name: 'Huevos Blancos',
    price: 42.00,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=800',
    unit: '12 pzas',
    description: 'Huevos frescos de granja seleccionados.'
  },
  {
    id: '13',
    name: 'Carne Molida',
    price: 98.00,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=800',
    unit: 'kg',
    description: 'Carne de res molida 90/10.'
  },
  {
    id: '14',
    name: 'Croissant Mantequilla',
    price: 15.00,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    unit: 'pieza',
    description: 'Horneados diariamente con mantequilla real.'
  }
];