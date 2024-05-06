import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../shared-module/models/interface.model';
import { InvoiceService } from '../shared-module/services/invoices.service';

@Component({
  selector: 'app-login',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit {
  public currentInvoice!: Invoice;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'items', 'quantities', 'prices', 'status', 'type'];
  displayedColumnsWithAction: string[] = ['id', 'items', 'quantities', 'prices', 'status', 'type', 'action'];
  dataSource!: MatTableDataSource<Invoice>;
  dialogRef: any;
  constructor(private invoiceService: InvoiceService, private cdref: ChangeDetectorRef, private dialog: MatDialog ) {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public ngAfterViewInit(): void {
    this.invoiceService.getAllInvoices().subscribe((currInvocies: Invoice[] | undefined)=>{
      this.dataSource =  new MatTableDataSource(currInvocies);
      this.dataSource.paginator = this.paginator;
      this.cdref.detectChanges();
    });
  }
  public handleDelete( el: any, invoice: Invoice): void {
    this.currentInvoice = invoice;
    this.dialogRef = this.dialog.open(el);
  }
  public onCancelDelete() {
    this.dialogRef.close();
  }
  public onConfirmDelete() {
    this.invoiceService.deleteInvoice(this.currentInvoice.id).subscribe((res) => {
      if (res) {
        this.dialogRef.close();
      }
    });
  }
  public EditInvoice(element: Invoice) {
    console.log(element)
  }
}
