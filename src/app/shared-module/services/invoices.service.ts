import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Invoice } from '../models/invoice.interface.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public invoicesSubject$ = new BehaviorSubject<Invoice[]>([]);
  private initialInvoices: Invoice[] = [
    {
      id: 1,
      items: 'Item 11',
      quantities: 2,
      prices: 100,
      status: 'Paid',
      type: 'Credit Card'
    },
    {
      id: 2,
      items: 'Item 88',
      quantities: 3,
      prices: 107.2,
      status: 'Paid',
      type: 'cash'
    },
    {
      id: 3,
      items: 'Item 79',
      quantities: 289,
      prices: 1089,
      status: 'Paid',
      type: 'Credit Card'
    },
    {
      id: 4,
      items: 'Item 6',
      quantities: 6,
      prices: 106,
      status: 'Paid',
      type: 'debit card'
    },
    {
      id: 5,
      items: 'Item 1',
      quantities: 77,
      prices: 18,
      status: 'un paid',
      type: 'Credit Card'
    },
    {
      id: 6,
      items: 'Item 1',
      quantities: 59,
      prices: 10,
      status: 'Paid',
      type: 'debit Card'
    },
    {
      id: 7,
      items: 'Item 1',
      quantities: 63,
      prices: 10797,
      status: 'unpaid',
      type: 'cash'
    },
    {
      id: 8,
      items: 'Item 1',
      quantities: 2,
      prices: 10,
      status: 'Paid',
      type: 'Credit Card'
    },
  ];
  invoices$ = this.invoicesSubject$.asObservable();

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
      this.invoicesSubject$.next(this.initialInvoices);
    }
    return this.invoices$;
  }

  addInvoice(invoice: Invoice) {
    const invoices = this.getInvoices();
    invoice.id = this.invoicesSubject$.value[this.invoicesSubject$.value.length - 1].id + 1;
    invoices.push(invoice);
    this.invoicesSubject$.next(invoices);
    return this.invoices$;
  }

  updateInvoice(updatedInvoice: Invoice) {
    const invoices = this.getInvoices();
    const index = invoices.findIndex(invoice => invoice.id === updatedInvoice.id);
    if (index !== -1) {
      invoices[index] = updatedInvoice;
      this.invoicesSubject$.next(invoices);
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
      this.invoicesSubject$.next(invoices);
      return this.invoices$;
    }
    else {
        return of({});
    }
  }
}