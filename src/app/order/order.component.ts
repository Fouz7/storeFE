import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  constructor(private orderService: OrderService, private dialog: MatDialog) {}
  orders: Order[] = [];

  filteredOrders= new MatTableDataSource<Order>([]);

  displayedColumns: string[] = [
    'order_id',
    'order_code',
    'order_date',
    'customer_code',
    'item_code',
    'quantity',
    'total_price',
    'actions'
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredOrders.data = this.orders.filter(order => {
      return order.order_code.toLowerCase().includes(filterValue) ||
             order.order_date.toString().includes(filterValue) ||
             order.quantity.toString().includes(filterValue) ||
             order.total_price.toString().includes(filterValue);
    });
  }

  ngOnInit(): void {
    this.getOrders();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.filteredOrders.paginator = this.paginator;
    }
  }

  getOrders(): void {
    this.orderService.getOrders()
      .subscribe((orders: Order[]) => {
        this.orders = orders
        this.filteredOrders.data = orders;
      });
  }

  updateCustomer(id: number, data: any): void {
    this.orderService.updateOrder(id, data).subscribe();
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe();
  }

  openEditDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      data: {order: order}
    });

    dialogRef.afterClosed().subscribe(updatedOrder => {
      if (updatedOrder) {
        this.orderService.updateOrder(order.order_id, updatedOrder);
      }
    });
  }
  
}
