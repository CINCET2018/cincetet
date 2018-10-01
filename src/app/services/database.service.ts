import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Packaging } from '../models/Packaging';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';
import { ProductType } from '../models/ProductType';
import { Employee } from '../models/Employee';
import { Location } from '../models/Location';
import { BranchType } from '../models/BranchType';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

//declaracion URL******************************************************************
  private urlPackaging:string ='Packaging';
  private urlCustomer:string ='Customer';
  private urlProduct:string ='Product';
  private urlTpProduct:string ='TpProduct';
  private urlEmployee:string ='Employee';
  private urlPendingUser:string ='PendingUser';
  private urlLocation:string ='Location';
  private urlTpBranch:string ='TpBranch';

//Declaracion Listas******************************************************************
  listPackaging: AngularFireList<any>;
  listCustomer: AngularFireList<any>;
  listProduct: AngularFireList<any>;
  listTpProduct: AngularFireList<any>;
  listEmployee: AngularFireList<any>;
  listPendingUser: AngularFireList<any>;
  listLocation: AngularFireList<any>;  
  listTpBranch: AngularFireList<any>;  

  constructor(private firebase:AngularFireDatabase) { }

  //INICIALIZACION******************************************************************
  initListPackaging(){
    this.listPackaging = this.firebase.list(this.urlPackaging);
  }
  initListCustomer(){
    this.listCustomer = this.firebase.list(this.urlCustomer);
  }
  initListProduct(){
    this.listProduct = this.firebase.list(this.urlProduct);
  }
  initListTpProduct(){
    this.listTpProduct = this.firebase.list(this.urlTpProduct);
  }
  initListEmployee(){
    this.listEmployee = this.firebase.list(this.urlEmployee);
  }
  initListPendingUser(){
    this.listPendingUser = this.firebase.list(this.urlPendingUser);
  }
  initListLocation(keyCustomer:string){
    this.listLocation = this.firebase.list(this.urlLocation+"/"+keyCustomer);
  }
  initListTpBranch(){
    this.listTpBranch = this.firebase.list(this.urlTpBranch);
  }



  //GET DATA******************************************************************
  getListPackaging(){
    this.initListPackaging();
    return this.listPackaging;
  }
  getListCustomer(){
    this.initListCustomer();
    return this.listCustomer;
  }
  getListProduct(){
    this.initListProduct();
    return this.listProduct;
  }
  getListTpProduct(){
    this.initListTpProduct();
    return this.listTpProduct;
  }
  getListEmployee(){
    this.initListEmployee();
    return this.listEmployee;
  }
  getListPendingUser(){
    this.initListPendingUser();
    return this.listPendingUser;
  }   
  getPendingUser(user:string){
    return this.firebase.list(this.urlPendingUser+'/'+user);
  }   
  getEmployee(user:string){
    return this.firebase.list(this.urlEmployee+'/'+user);
  } 
  getLocations(keyCustomer:string){
    this.initListLocation(keyCustomer);
    return this.listLocation;
  }   
  getListTpBranch(){
    this.initListTpBranch();
    return this.listTpBranch;
  }

  //UPDATE******************************************************************
  updateListPackagings(packaging:Packaging){
    this.initListPackaging();
    this.listPackaging.update(packaging.$key,{description:packaging.description, enable: packaging.enable});
  }
  updateListCustomer(customer:Customer){
    this.initListCustomer();
    this.listCustomer.update(customer.$key,{
      name:customer.name, 
      document:customer.document, 
      contactPerson:customer.contactPerson, 
      cellphone:customer.cellphone, 
      location:customer.location,  
      enable: customer.enable
    });
  }
  updateListProduct(product:Product){
    this.initListProduct();
    this.listProduct.update(product.$key,{
      name:product.name, 
      packaging:product.packaging, 
      productType:product.productType, 
      unitPrice:product.unitPrice, 
      retailPrice:product.retailPrice,  
      enable: product.enable
    });
  }
  updateListTpProduct(tpProduct:ProductType){
    this.initListTpProduct();
    this.listTpProduct.update(tpProduct.$key,{description:tpProduct.description, enable:tpProduct.enable});
  }
  updateListEmployee(employee:Employee){
    this.initListEmployee();
    this.listEmployee.update(employee.$key,{
      name:employee.name, 
      phone:employee.phone, 
      email:employee.email,
      enable: employee.enable
    });
  }
  updateListPendingUser(user:Employee){
    this.initListPendingUser();
    this.listPendingUser.update(user.$key,{
      name:user.name, 
      phone:user.phone, 
      email:user.email
    });
  }
  updateListLocation(keyCustomer:string,location:Location){
    this.initListLocation(keyCustomer);
    this.listLocation.update(location.$key,{
      latitud:location.latitud, 
      longitud:location.longitud, 
      address:location.address, 
      city:location.city,
      branchType:location.branchType
    });
  } 
  updateListTpBranch(tpBranch:BranchType){
    this.initListTpBranch();
    this.listTpBranch.update(tpBranch.$key,{description:tpBranch.description, enable:tpBranch.enable});
  }

  //INSERT******************************************************************
  insertListPackaging(packaging:Packaging){
    this.initListPackaging();
    this.listPackaging.push({description: packaging.description, enable: packaging.enable});
  }
  insertListCustomer(customer:Customer){
    this.initListCustomer();
    this.listCustomer.push({
      name:customer.name, 
      document:customer.document, 
      contactPerson:customer.contactPerson, 
      cellphone:customer.cellphone, 
      location:customer.location, 
      enable: customer.enable
    });
  }
  insertListProduct(product:Product){
    this.updateListProduct(product);
  }
  insertListTpProduct(tpProduct:ProductType){
    this.initListTpProduct();
    this.listTpProduct.push({description:tpProduct.description});
  }
  insertListEmployee(employee:Employee){
    this.updateListEmployee(employee);
  }
  insertListPendingUser(user:Employee){
    this.updateListPendingUser(user);
  }
  insertListLocation(keyCustomer:string, location:Location){
    this.initListLocation(keyCustomer);
    this.listLocation.push({
      latitud:location.latitud, 
      longitud:location.longitud, 
      address:location.address, 
      city:location.city,
      branchType:location.branchType 
    });
  }
  insertListTpBranch(tpBranch:BranchType){
    this.initListTpBranch();
    this.listTpBranch.push({description:tpBranch.description, enable:tpBranch.enable});
  }

  //DELETE******************************************************************
  deleteListPackaging(packaging:Packaging){
    packaging.enable=false;
    this.updateListPackagings(packaging);
  }
  deleteListCustomer(customer:Customer){
    customer.enable=false;
    this.updateListCustomer(customer);
  }
  deleteListProduct(product:Product){
    product.enable=false;
    this.updateListProduct(product);
  }
  deleteListTpProduct(tpProduct:ProductType){
    tpProduct.enable=false;
    this.updateListTpProduct(tpProduct);
  }
  deleteListEmployee(employee:Employee){
    employee.enable=false;
    this.updateListEmployee(employee);
  }
  deleteListPendingUser($key: string){
    this.initListPendingUser();
    this.listPendingUser.remove($key);
  }
  deleteListLocation(keyCustomer:string, $key: string){
    this.initListLocation(keyCustomer);
    this.listLocation.remove($key);
  }  
  deleteListTpBranch(tpBranch:BranchType){
    tpBranch.enable=false;
    this.updateListTpBranch(tpBranch);
  }
}

