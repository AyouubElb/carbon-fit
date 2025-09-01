export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  onSale: boolean;
  brands: { name: string };
  images: string[];
  description: string;
  sizes: string[];
  created_at: Date;
}

export interface Brand {
  id: string;
  name: string;
  image: string;
}
