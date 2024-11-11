import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderService } from '../../../core/services/order.service';
import { CustomerService } from '../../../core/services/customer.service';
import { ProductService } from '../../../core/services/product.service';
import {CreateOrderDTO} from '../../../core/models/order.model';
import {ProductDTO} from '../../../core/models/product.model';
import {AddressDTO, CustomerDTO} from '../../../core/models/customer.model';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinner
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit  {
  orderForm!: FormGroup;
  loading = false;
  loadingCustomers = false;  // Para el estado de carga de clientes
  loadingAddresses = false;  // Para el estado de carga de direcciones
  loadingProducts = false;   // Para el estado de carga de productos
  customers: CustomerDTO[] = [];
  addresses: AddressDTO[] = [];
  products: ProductDTO[] = [];
  productPrices: { [key: number]: number } = {};

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private dialogRef: MatDialogRef<CreateOrderComponent>,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadInitialData();
  }

  private createForm() {
    this.orderForm = this.fb.group({
      customerId: ['', Validators.required],
      addressId: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      notes: [''],
      details: this.fb.array([])
    });

    // Add first detail by default
    this.addDetail();
  }

  get details() {
    return this.orderForm.get('details') as FormArray;
  }

  private createDetailForm() {
    return this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  private loadInitialData() {
    // Mostrar spinner mientras se cargan los datos
    this.loadingCustomers = true;

    // Cargar clientes
    this.customerService.getAll().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.customers = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.snackBar.open('Error loading customers', 'Close', {
          duration: 3000
        });
      },
      complete: () => {
        this.loadingCustomers = false;
      }
    });

    // Cargar productos
    this.loadingProducts = true;

    this.productService.getAll({ isAvailable: true }).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.products = response.data;
          // Crear lookup de precios
          this.products.forEach(p => this.productPrices[p.id] = p.price);
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.snackBar.open('Error loading products', 'Close', {
          duration: 3000
        });
      },
      complete: () => {
        this.loadingProducts = false;
      }
    });
  }

  onCustomerChange(customerId: number) {
    const addressControl = this.orderForm.get('addressId');
    addressControl?.setValue('');

    if (customerId) {
      // Mostrar loading en el select de direcciones
      this.loadingAddresses = true;

      this.customerService.getAddressesByCustomerId(customerId).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.addresses = response.data;
          }
        },
        error: (error) => {
          console.error('Error loading addresses:', error);
          this.snackBar.open('Error loading addresses', 'Close', {
            duration: 3000
          });
        },
        complete: () => {
          this.loadingAddresses = false;
        }
      });
    } else {
      this.addresses = [];
    }
  }

  addDetail() {
    this.details.push(this.createDetailForm());
  }

  removeDetail(index: number) {
    this.details.removeAt(index);
  }

  onProductChange(index: number, productId: number) {
    this.updateSubtotal(index);
  }

  updateSubtotal(index: number) {
    const detail = this.details.at(index);
    const productId = detail.get('productId')?.value;
    const quantity = detail.get('quantity')?.value || 0;
    const price = this.productPrices[productId] || 0;
    return quantity * price;
  }

  calculateSubtotal(index: number): number {
    return this.updateSubtotal(index);
  }

  calculateTotal(): number {
    return this.details.controls.reduce((total, detail) => {
      const productId = detail.get('productId')?.value;
      const quantity = detail.get('quantity')?.value || 0;
      return total + (this.productPrices[productId] || 0) * quantity;
    }, 0);
  }

  formatAddress(address: AddressDTO): string {
    return `${address.street} ${address.exteriorNumber}, ${address.neighborhood}, ${address.city}`;
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.loading = true;
      const order: CreateOrderDTO = this.orderForm.value;

      this.orderService.create(order).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.snackBar.open('Order created successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.dialogRef.close(true);
          } else {
            this.snackBar.open(response.message || 'Error creating order', 'Close', {
              duration: 3000
            });
          }
        },
        error: (error) => {
          console.error('Error creating order:', error);
          this.snackBar.open('Error creating order', 'Close', {
            duration: 3000
          });
          this.loading = false;
        }
      });
    }
  }
}
