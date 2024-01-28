import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { CustomersService } from '../services/customer.service';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { ItemService } from '../services/item.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { OrderService } from '../services/order.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private customersService: CustomersService,
    private itemService: ItemService,
    private orderService: OrderService,
    private reportService: ReportService
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  generateReport(){
    const format = 'pdf';
    this.reportService.summarize(format, { observe: 'response', responseType: 'blob' }).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.snackbar.open('The Summary Report has been generated', '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        }
      }
    );
  }
      
    openDialog(): void {
      let dialogRef;
      const route = this.router.url.toString();

      if (route.includes('customer')){
        dialogRef = this.dialog.open(CustomerDialogComponent,{
          width: '800px',
          height: '550px',
        });
      } else if (route.includes('item')) {
        dialogRef = this.dialog.open(ItemDialogComponent,{
          width: '800px',
          height: '550px',
        });
      } else if (route.includes('order')) {
        dialogRef = this.dialog.open(OrderDialogComponent,{
          width: '800px',
          height: '450px',
        });
      }

      if (dialogRef) {
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (route.includes('customer')) {
              this.customersService.createCustomer(result).subscribe();
            } else if (route.includes('item')) {
              this.itemService.createItem(result).subscribe();
            } else if (route.includes('order')) {
              this.orderService.createOrder(result).subscribe();
            }
          }
        });
    }
  }

}
