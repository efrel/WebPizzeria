import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { OrderDTO } from '../../../core/models/order.model';
import {CreateOrderComponent} from '../create-order/create-order.component';
import {OrderDetailComponent} from '../order-detail/order-detail.component';


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit  {
  displayedColumns = ['id', 'customerName', 'orderDate', 'orderStatus', 'totalAmount', 'actions'];
  dataSource = new MatTableDataSource<OrderDTO>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.dataSource.data = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }

  viewDetails(order: OrderDTO) {
    this.dialog.open(OrderDetailComponent, {
      width: '800px',
      data: { order }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      width: '900px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }
}
