export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  category: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  category: string;
  imageUrl: string;
}

export interface UpdateProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  category: string;
  imageUrl: string;
}

export interface GetAllProductDTO {
  isAvailable?: boolean;
  category?: string;
}

export interface GetProductByIdDTO {
  id: number;
}
