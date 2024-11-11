export interface CustomerDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: AddressDTO[];
}

export interface AddressDTO {
  id: number;
  customerId: number;
  street: string;
  exteriorNumber: string;
  interiorNumber?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  reference?: string;
}
