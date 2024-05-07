import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/shared-module/models/invoice.interface.model';
import { InvoiceService } from 'src/app/shared-module/services/invoices.service';

@Component({
  selector: 'app-login',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class AddEditInvoiceComponent implements OnInit {
  public invoiceForm: FormGroup = new FormGroup([]);
  public invalidCredentials: boolean = false;
  public hide = true;
  public id: string = '';
  public isAdd: boolean = true;
  error = '';
  currentRole: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {
  }
  public ngOnInit() {
    const idParam = this.route.snapshot.queryParamMap.get('id');
    this.id = idParam? idParam : '';
    this.invoiceForm = this.formBuilder.group({
      items: ['', Validators.required],
      prices: ['', Validators.required],
      quantities: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
    });
    if (this.id) {
      this.isAdd = false;
      const currentInvoice =this.invoiceService.getInvoice(+this.id);
      this.invoiceForm.controls['items'].setValue(currentInvoice?.items);
      this.invoiceForm.controls['prices'].setValue(currentInvoice?.prices);
      this.invoiceForm.controls['quantities'].setValue(currentInvoice?.quantities);
      this.invoiceForm.controls['status'].setValue(currentInvoice?.status);
      this.invoiceForm.controls['type'].setValue(currentInvoice?.type);
    } 
  }

  public submitData() {
    if (this.isAdd) {
      const data = this.invoiceForm.getRawValue() as Invoice;
      this.invoiceService.addInvoice(data).subscribe((res) => {
        this.router.navigate(['/']);
      })
    } else {
      const data = this.invoiceForm.getRawValue() as Invoice;
      data.id = +this.id;
      this.invoiceService.updateInvoice(data).subscribe((res) => {
        this.router.navigate(['/']);
      })

    }
  }
}
