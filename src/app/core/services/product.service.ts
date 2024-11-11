import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/auth.models';
import {
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
  GetAllProductDTO
} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = `${environment.apiUrlBase}/product`;

  constructor(private http: HttpClient) {}

  getAll(params?: GetAllProductDTO): Observable<ApiResponse<ProductDTO[]>> {
    return this.http.get<ApiResponse<ProductDTO[]>>(`${this.API_URL}/GetAll`, { params: params as any });
  }

  getById(id: number): Observable<ApiResponse<ProductDTO>> {
    return this.http.get<ApiResponse<ProductDTO>>(`${this.API_URL}/GetById/${id}`);
  }

  create(product: CreateProductDTO): Observable<ApiResponse<ProductDTO>> {
    return this.http.post<ApiResponse<ProductDTO>>(`${this.API_URL}/Create`, product);
  }

  update(id: number, product: UpdateProductDTO): Observable<ApiResponse<ProductDTO>> {
    return this.http.put<ApiResponse<ProductDTO>>(`${this.API_URL}/Update/${id}`, product);
  }

  delete(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.API_URL}/Delete/${id}`);
  }
}
