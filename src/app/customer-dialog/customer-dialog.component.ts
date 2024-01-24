import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.css'
})
export class CustomerDialogComponent {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  customerForm = this.fb.group({
    customer_id: [''],
    customer_code: ['', Validators.required],
    customer_name: ['', Validators.required],
    customer_address: ['', Validators.required],
    customer_phone: ['', Validators.required],
    is_active: [false, Validators.required],
    last_order_date: ['', Validators.required],
    pic: ['', Validators.required]
  });

  ngOnInit(): void {
    if (this.data && this.data.customer) {
      this.customerForm.setValue(this.data.customer);
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      console.log('Form value:', this.customerForm.value);
      this.dialogRef.close(this.customerForm.value);
    }
  }

}
