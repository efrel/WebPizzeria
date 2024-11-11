import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../models/auth.models';
import { CustomerDTO, AddressDTO } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private mockCustomers: CustomerDTO[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '123-456-7890',
      addresses: [
        {
          id: 1,
          customerId: 1,
          street: 'Main Street',
          exteriorNumber: '123',
          neighborhood: 'Downtown',
          city: 'Springfield',
          state: 'ST',
          zipCode: '12345',
          reference: 'Near Central Park'
        },
        {
          id: 2,
          customerId: 1,
          street: 'Work Avenue',
          exteriorNumber: '456',
          interiorNumber: 'Suite 789',
          neighborhood: 'Business District',
          city: 'Springfield',
          state: 'ST',
          zipCode: '12346',
          reference: 'Office Building'
        }
      ]
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@email.com',
      phone: '098-765-4321',
      addresses: [
        {
          id: 3,
          customerId: 2,
          street: 'Oak Lane',
          exteriorNumber: '789',
          neighborhood: 'Suburbs',
          city: 'Springfield',
          state: 'ST',
          zipCode: '12347',
          reference: 'White House'
        }
      ]
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.j@email.com',
      phone: '555-555-5555',
      addresses: [
        {
          id: 4,
          customerId: 3,
          street: 'Pine Road',
          exteriorNumber: '321',
          neighborhood: 'East Side',
          city: 'Springfield',
          state: 'ST',
          zipCode: '12348',
          reference: 'Next to School'
        },
        {
          id: 5,
          customerId: 3,
          street: 'Beach Boulevard',
          exteriorNumber: '654',
          neighborhood: 'Coast',
          city: 'Springfield',
          state: 'ST',
          zipCode: '12349',
          reference: 'Beach House'
        }
      ]
    },
    {
      id: 4,
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.g@email.com',
      phone: '777-888-9999',
      addresses: [
        {
          id: 6,
          customerId: 4,
          street: 'Maple Avenue',
          exteriorNumber: '987',
          interiorNumber: 'Apt 5B',
          neighborhood: 'North Side',
          city: 'Springfield',
          state: 'ST',
          zipCode: '12350',
          reference: 'Red Building'
        }
      ]
    }
  ];

  getAll(): Observable<ApiResponse<CustomerDTO[]>> {
    return of({
      data: this.mockCustomers,
      isSuccess: true,
      message: 'Customers retrieved successfully',
      error: [],
      errorMessage: []
    }).pipe(delay(500)); // Simular latencia de red
  }

  getAddressesByCustomerId(customerId: number): Observable<ApiResponse<AddressDTO[]>> {
    const customer = this.mockCustomers.find(c => c.id === customerId);
    const addresses = customer ? customer.addresses : [];

    return of({
      data: addresses,
      isSuccess: true,
      message: 'Addresses retrieved successfully',
      error: [],
      errorMessage: []
    }).pipe(delay(300)); // Simular latencia de red
  }
}
