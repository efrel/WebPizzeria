export interface OrderDTO {
  id: number;
  customerId: number;
  customerName: string;
  addressId: number;
  addressDetail: string;
  orderDate: Date;
  orderStatus: string;
  totalAmount: number;
  paymentMethod: string;
  notes: string;
  details: OrderDetailDTO[];
}

export interface OrderDetailDTO {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  notes: string;
}

export interface CreateOrderDTO {
  customerId: number;
  addressId: number;
  paymentMethod: string;
  notes: string;
  details: CreateOrderDetailDTO[];
}

export interface CreateOrderDetailDTO {
  productId: number;
  quantity: number;
  notes: string;
}

export interface UpdateOrderDTO {
  id: number;
  orderStatus: string;
  paymentMethod: string;
  notes: string;
  details: UpdateOrderDetailDTO[];
}

export interface UpdateOrderDetailDTO {
  id?: number;
  productId: number;
  quantity: number;
  notes: string;
}
