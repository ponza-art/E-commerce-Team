export interface WatchDetails {
    _id?: string;
    productId: string;
    productName: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    images: string[];
    specifications: string;
    color: string;
    weight: number;
    material: string;
    gender: string;
    quantity?: number; 
    stock?: number; // Optional, if you need to track stock availability
    __v?: number;
  }
  
  export interface databaseWatchDetails {
    _id: string;
    productId: string;
    productName: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    images: string[];
    specifications: string;
    color: string;
    weight: string;
    material: string;
    gender: string;
    isAvailable: boolean;
    quantity?: number; 
    stock?: number; 
  }
  
  export interface ProductParams {
    gender?: string;
    brand?: string;
    category?: string;
    color?: string;
  }
  
  export interface CartProduct {
    productId: databaseWatchDetails;
    quantity: number;
    _id: string;
  }
  
  export interface orderData {
    productId: string;
    quantity: number;
  }
  