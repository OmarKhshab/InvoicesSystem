import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../shared-module/models/interface.model';
import { InvoiceService } from '../shared-module/services/invoices.service';

@Component({
  selector: 'app-login',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit {
  public invocies: Invoice[] = [];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'items', 'quantities', 'prices', 'status', 'type'];
  dataSource!: MatTableDataSource<Invoice>;
  constructor(private invoiceService: InvoiceService, private cdref: ChangeDetectorRef) {
  }
  public ngOnInit() {
    this.invocies =  this.invoiceService.getInvoices();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public ngAfterViewInit(): void {

    this.dataSource =  new MatTableDataSource(this.invocies);
    this.dataSource.paginator = this.paginator;
    this.cdref.detectChanges();
  }
}
