import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit{
    constructor(private itemService: ItemService, private dialog: MatDialog) {}
    items: Item[] = [];

    filteredItems= new MatTableDataSource<Item>([]);

    displayedColumns: string[] = [
      'item_id',
      'item_code',
      'item_name',
      'last_re_stock',
      'stock',
      'is_available',
      'price',
      'actions'
    ];  
  
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.filteredItems.data = this.items.filter(item => {
        return item.item_code.toLowerCase().includes(filterValue) ||
               item.item_name.toLowerCase().includes(filterValue) ||
               item.last_re_stock.toString().includes(filterValue) ||
               item.stock.toString().includes(filterValue) ||
               item.is_available.toString().includes(filterValue) ||
               item.price.toString().includes(filterValue);
      });
    }
  
    ngOnInit(): void {
      this.getItems();
    }

    ngAfterViewInit() {
      if (this.paginator) {
        this.filteredItems.paginator = this.paginator;
      }
    }
  
    getItems(): void {
      this.itemService.getItems()
        .subscribe((items: Item[]) => {
          this.items = items;
          this.filteredItems.data = items;
        });
    }

    updateCustomer(id:number, data:any): void {
      this.itemService.updateItem(id, data).subscribe();
    }

    deleteCustomer(id:number): void {
      this.itemService.deleteItem(id).subscribe();
    }

    openEditDialog(item: Item): void {
      const dialogRef = this.dialog.open(ItemDialogComponent, {
        data: { item: item}
      });
  
      dialogRef.afterClosed().subscribe(updatedItem => {
        if (updatedItem) {
          this.updateCustomer(updatedItem.item_id, updatedItem);
        }
      });
    }

}
