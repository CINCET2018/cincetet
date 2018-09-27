import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Packaging } from '../models/Packaging';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

//declaracion URL
  private urlPackaging:string ='Packaging';
  private urlCustomer:string ='Customer';
  private urlProduct:string ='Product';

//Declaracion Listas
  listPackaging: AngularFireList<any>;
  listCustomer: AngularFireList<any>;
  listProduct: AngularFireList<any>;
  
  constructor(private firebase:AngularFireDatabase) { }

  //INICIALIZACION
  initListPackaging(){
    this.listPackaging = this.firebase.list(this.urlPackaging);
  }
  initListCustomer(){
    this.listCustomer = this.firebase.list(this.urlCustomer);
  }
  initListProduct(){
    this.listProduct = this.firebase.list(this.urlProduct);
  }


  //GET DATA
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



  //UPDATE
  updateListPackagings(packaging:Packaging){
    this.initListPackaging();
    this.listPackaging.update(packaging.$key,{description:packaging.description});
  }
  updateListCustomer(customer:Customer){
    this.initListPackaging();
    this.listCustomer.update(customer.$key,{
      name:customer.name, 
      document:customer.document, 
      contactPerson:customer.contactPerson, 
      cellphone:customer.cellphone, 
      location:customer.location, 
    });
  }
  updateListProduct(product:Product){
    this.initListPackaging();
    this.listCustomer.update(product.$key,{
      name:product.name, 
      packaging:product.packaging, 
      productType:product.productType, 
      unitPrice:product.unitPrice, 
      retailPrice:product.retailPrice, 
    });
  }

  //INSERT
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
    this.initListPackaging();
    this.listCustomer.push({
      name:product.name, 
      packaging:product.packaging, 
      productType:product.productType, 
      unitPrice:product.unitPrice, 
      retailPrice:product.retailPrice, 
    });
  }

  //DELETE
  deleteListPackaging($key: string){
    this.initListPackaging();
    this.listPackaging.remove($key);
  }
  deleteListCustomer($key: string){
    this.initListCustomer();
    this.listCustomer.remove($key);
  }
  deleteListProduct($key: string){
    this.initListProduct();
    this.listProduct.remove($key);
  }
}

