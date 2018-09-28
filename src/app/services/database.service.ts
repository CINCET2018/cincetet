import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Packaging } from '../models/Packaging';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';
import { ProductType } from '../models/ProductType';
import { Employee } from '../models/Employee';
import { Location } from '../models/Location';

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

//Declaracion Listas******************************************************************
  listPackaging: AngularFireList<any>;
  listCustomer: AngularFireList<any>;
  listProduct: AngularFireList<any>;
  listTpProduct: AngularFireList<any>;
  listEmployee: AngularFireList<any>;
  listPendingUser: AngularFireList<any>;
  listLocation: AngularFireList<any>;  
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
  initListLocation(){
    this.listLocation = this.firebase.list(this.urlLocation);
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
  getLocations(){
    this.initListLocation();
    return this.listLocation;
  }   

  //UPDATE******************************************************************
  updateListPackagings(packaging:Packaging){
    this.initListPackaging();
    this.listPackaging.update(packaging.$key,{description:packaging.description});
  }
  updateListCustomer(customer:Customer){
    this.initListCustomer();
    this.listCustomer.update(customer.$key,{
      name:customer.name, 
      document:customer.document, 
      contactPerson:customer.contactPerson, 
      cellphone:customer.cellphone, 
      location:customer.location, 
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
    });
  }
  updateListTpProduct(tpProduct:ProductType){
    this.initListTpProduct();
    this.listTpProduct.update(tpProduct.$key,{description:tpProduct.description});
  }
  updateListEmployee(employee:Employee){
    this.initListEmployee();
    this.listEmployee.update(employee.$key,{
      name:employee.name, 
      phone:employee.phone, 
      email:employee.email
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
  updateListLocation(location:Location){
    this.initListLocation();
    this.listLocation.update(location.$key,{
      geolocation:location.geolocation, 
      address:location.address, 
      city:location.city,
      branchType:location.branchType
    });
  } 

  //INSERT******************************************************************
  insertListPackaging(packaging:Packaging){
    this.initListPackaging();
    this.listPackaging.push({description: packaging.description});
  }
  insertListCustomer(customer:Customer){
    this.initListCustomer();
    this.listCustomer.push({
      name:customer.name, 
      document:customer.document, 
      contactPerson:customer.contactPerson, 
      cellphone:customer.cellphone, 
      location:customer.location, 
    });
  }
  insertListProduct(product:Product){
    this.initListProduct();
    this.listProduct.push({
      name:product.name, 
      packaging:product.packaging, 
      productType:product.productType, 
      unitPrice:product.unitPrice, 
      retailPrice:product.retailPrice, 
    });
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
  insertListLocation(location:Location){
    this.initListLocation();
    this.listLocation.push({
      geolocation:location.geolocation, 
      address:location.address, 
      city:location.city,
      branchType:location.branchType
    });
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
  deleteListEmployee($key: string){
    this.initListEmployee();
    this.listEmployee.remove($key);
  }
  deleteListPendingUser($key: string){
    this.initListPendingUser();
    this.listPendingUser.remove($key);
  }
  deleteListLocation($key: string){
    this.initListLocation();
    this.listLocation.remove($key);
  }  
}

