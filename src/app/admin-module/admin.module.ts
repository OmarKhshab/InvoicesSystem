import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared-module/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddEditInvoiceComponent } from './addEditInvoiceForm/invoice-form.component';



@NgModule({
  declarations: [
    AdminComponent,
    AddEditInvoiceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
  ],
  exports: [
    AdminComponent,
  ]
})
export class AdminModule { }
