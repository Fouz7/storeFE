import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { ItemComponent } from './item/item.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { OrderComponent } from './order/order.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatTableModule,
        MatRadioModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        CustomerComponent,
        CustomerDialogComponent,
        ItemComponent,
        ItemDialogComponent,
        OrderComponent,
        OrderDialogComponent
    ],
    bootstrap: [ AppComponent ]
    })


export class AppModule { }