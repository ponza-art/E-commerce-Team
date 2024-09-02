export interface OrderItem {
    productId: string;
    quantity: number;
  }
export interface useOrdered{
  address: string;
  email: string;
  fullName: string;
  phone: number;
  pincode: number;
  _id: string;
}

export interface dbOrder {
    _id: string;
    amount: number;
    order: OrderItem[];
    userDetails: useOrdered;
    isPaid: boolean;
    orderDate: Date;
    deliveryDate: Date;
    __v: number;
  }
