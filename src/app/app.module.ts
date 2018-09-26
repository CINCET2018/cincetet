import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { PackagingComponent } from './components/packaging/packaging.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LocationComponent } from './components/location/location.component';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { BranchTypeComponent } from './components/branch-type/branch-type.component';
import { SaleComponent } from './components/sale/sale.component';
import { EmployeeComponent } from './components/employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    PackagingComponent,
    ProductTypeComponent,
    CustomerComponent,
    LocationComponent,
    GeolocationComponent,
    BranchTypeComponent,
    SaleComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
