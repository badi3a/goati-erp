import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule , Routes  } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandComponent } from './components/brand/brand.component';
import { ProvidorComponent } from './components/providor/providor.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { RfqComponent } from './components/rfq/rfq.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';

import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { AddRFQComponent } from './components/rfq/add-rfq/add-rfq.component';
import { RfqContentComponent } from './components/rfq/add-rfq/rfq-content/rfq-content.component';
import { RfqInputComponent } from './components/rfq/add-rfq/rfq-input/rfq-input.component';
import { ProductByCategoryComponent } from './components/product/product-by-category/product-by-category.component';
import { ProductByBrandComponent } from './components/product/product-by-brand/product-by-brand.component';
 



const appRoutes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'providors', component: ProvidorComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'request-for-quotation', component: RfqComponent },
  { path: 'request-for-quotation/new', component: AddRFQComponent },
  { path: 'products/category/:categoryName', component: ProductByCategoryComponent },
  { path: 'products/brand/:brandName', component: ProductByBrandComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    BrandComponent,
    ProvidorComponent,
    InvoiceComponent,
    RfqComponent,
    AddRFQComponent,
    RfqContentComponent,
    RfqInputComponent,
    ProductByCategoryComponent,
    ProductByBrandComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelect2Module,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot( appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
