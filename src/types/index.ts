export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  badge?: string;
  category: string;
  licenseType: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
