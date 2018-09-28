import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

//Componentes
import { CustomerComponent } from './components/customer/customer.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { PackagingComponent } from './components/packaging/packaging.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { ProductComponent } from './components/product/product.component';
import { BranchTypeComponent } from './components/branch-type/branch-type.component';
import { SaleComponent } from './components/sale/sale.component';


const rutas: Routes = [
  {path: "Clientes", component: CustomerComponent},
  {path: "Empleados", component: EmployeeComponent},
  {path: "TipoEmpaque", component: PackagingComponent},
  {path: "TipoProducto", component: ProductTypeComponent},
  {path: "Producto", component: ProductComponent},
  {path: "TipoNegocio", component: BranchTypeComponent},
  {path: "Ventas", component: SaleComponent},
  {path:"",redirectTo:"Ventas", pathMatch:"full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(rutas)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

