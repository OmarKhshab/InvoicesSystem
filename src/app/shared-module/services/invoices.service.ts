import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Invoice } from '../models/invoice.interface.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public invoicesSubject$ = new BehaviorSubject<Invoice[]>([]);
  private apiUrl = '../assets/data.json';
  invoices$ = this.invoicesSubject$.asObservable();
  constructor(private http: HttpClient) { }
  public getInvoices(): Invoice[] {
    return this.invoicesSubject$.getValue();
  }

  public getInvoice(id: number): Invoice | undefined {
    const invoices = this.getInvoices();
    const index = invoices.findIndex(invoice => invoice.id === id);
    if (index !== -1) {
      return invoices[index];

    } else {
      return undefined;
    }
  }

  public getAllInvoices(): Observable<Invoice[]> {
    if (this.invoicesSubject$.getValue().length === 0) {
      this.http.get<Invoice[]>(this.apiUrl).subscribe((res)=> {
          this.invoicesSubject$.next(res);
        });
    }
    return this.invoices$;
  }

  public addInvoice(invoice: Invoice) {
    const invoices = this.getInvoices();
    invoice.id = this.invoicesSubject$.value[this.invoicesSubject$.value.length - 1].id + 1;
    invoices.push(invoice);
    this.http.get<any>(this.apiUrl).subscribe((res)=> {
        this.invoicesSubject$.next(invoices);
      });
    return this.invoices$;
  }

  public updateInvoice(updatedInvoice: Invoice) {
    const invoices = this.getInvoices();
    const index = invoices.findIndex(invoice => invoice.id === updatedInvoice.id);
    if (index !== -1) {
      invoices[index] = updatedInvoice;
      this.invoicesSubject$.next(invoices);
      this.http.get<any>(this.apiUrl).subscribe((res)=> {
          this.invoicesSubject$.next(invoices);
        });
      return this.invoices$;
    }
    else {
      return this.invoices$;
    }
  }

  public deleteInvoice(id?: number) {
    const invoices = this.getInvoices();
    const index = invoices.findIndex(invoice => invoice.id === id);
    if (index !== -1) {
      invoices.splice(index, 1);
      this.http.get<any>(this.apiUrl).subscribe((res)=> {
          this.invoicesSubject$.next(invoices);
        });
      return this.invoices$;
    }
    else {
        return of({});
    }
  }
}