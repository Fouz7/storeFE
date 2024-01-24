import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.css'
})
export class OrderDialogComponent {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  orderForm = this.fb.group({
    order_id: [''],
    order_date: [''],
    order_code: ['', Validators.required],
    customer_code: this.fb.group({
      customer_id: ['', Validators.required]
    }),
    item_code: this.fb.group({
      item_id: ['', Validators.required]
    }),
    quantity: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.data && this.data.order) {
      this.orderForm.setValue(this.data.order);
    }
  }

  onSubmit():void {
    if (this.orderForm.valid) {
      this.dialogRef.close(this.orderForm.value);
    }
  }
}
