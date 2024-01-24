import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomersService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  constructor(private customersService: CustomersService, private dialog: MatDialog) {}

  customers: Customer[] = [];

  filteredCustomers= new MatTableDataSource<Customer>([]);

  displayedColumns: string[] = [
    'customer_id',
    'pic',
    'customer_code',
    'customer_name',
    'customer_address',
    'customer_phone',
    'is_active',
    'last_order_date',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.filteredCustomers.data = this.customers.filter(customer => {
      return customer.customer_name.toLowerCase().includes(filterValue) ||
             customer.customer_code.toLowerCase().includes(filterValue) ||
             customer.customer_address.toLowerCase().includes(filterValue) ||
             customer.customer_phone.toLowerCase().includes(filterValue) ||
             customer.last_order_date.toString().includes(filterValue) ||
             customer.is_active.toString().includes(filterValue);
    });
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.filteredCustomers.paginator = this.paginator;
    }
  }

  getCustomers(): void {
    this.customersService.getCustomers()
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
        this.filteredCustomers.data = customers;
      });
  }

  updateCustomer(id: number, data: any): void {
    this.customersService.updateCustomer(id, data)
      .subscribe(updatedCustomer => {
        console.log(updatedCustomer);
      });
  }
  
  deleteCustomer(id: number): void {
    this.customersService.deleteCustomer(id)
      .subscribe(() => {
        console.log('Customer deleted');
      });
  }

  openEditDialog(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: { customer: customer }
    });
  
    dialogRef.afterClosed().subscribe(updatedCustomer => {
      if (updatedCustomer) {
        console.log(updatedCustomer);
        this.updateCustomer(updatedCustomer.customer_id, updatedCustomer);
      }
    });
  }

  

  
}
