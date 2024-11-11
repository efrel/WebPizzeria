import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/auth.models';
import {
  OrderDTO,
  CreateOrderDTO,
  UpdateOrderDTO
} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly API_URL = `${environment.apiUrlBase}/order`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<OrderDTO[]>> {
    return this.http.get<ApiResponse<OrderDTO[]>>(`${this.API_URL}/GetAll`);
  }

  getById(id: number): Observable<ApiResponse<OrderDTO>> {
    return this.http.get<ApiResponse<OrderDTO>>(`${this.API_URL}/GetById/${id}`);
  }

  create(order: CreateOrderDTO): Observable<ApiResponse<OrderDTO>> {
    return this.http.post<ApiResponse<OrderDTO>>(`${this.API_URL}/Create`, order);
  }

  update(id: number, order: UpdateOrderDTO): Observable<ApiResponse<OrderDTO>> {
    return this.http.put<ApiResponse<OrderDTO>>(`${this.API_URL}/Update/${id}`, order);
  }

  delete(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.API_URL}/Delete/${id}`);
  }
}
