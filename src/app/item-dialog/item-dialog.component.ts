import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrl: './item-dialog.component.css'
})
export class ItemDialogComponent {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  itemForm = this.fb.group({
    item_id: [''],
    item_code: ['', Validators.required],
    item_name: ['', Validators.required],
    last_re_stock: ['', Validators.required],
    stock: ['', Validators.required],
    is_available: [false, Validators.required],
    price: ['', Validators.required]
  });

  ngOnInit(): void {
    if (this.data && this.data.item) {
      this.itemForm.setValue(this.data.item);
    }
  }

  onSubmit():void {
    if (this.itemForm.valid) {
      this.dialogRef.close(this.itemForm.value);
    }
  }

}
