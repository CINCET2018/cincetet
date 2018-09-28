import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Product } from '../../models/Product';
import { ProductType } from '../../models/ProductType';
import { Packaging } from '../../models/Packaging';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  productForm : FormGroup;
  displayedColumns: string[] = ['key','name','packaging','productType','unitPrice','retailPrice','modify','delete'];
  dataSource = [];
  tpProductList = [];
  tpPackaging = [];


  constructor(private dbService : DatabaseService) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      $key: new FormControl('',[
        Validators.required]),
      name: new FormControl('',[
        Validators.required]),
      packaging: new FormControl('',[
        Validators.required]),
      productType: new FormControl('',[
        Validators.required]),
      unitPrice: new FormControl(Number,[
        Validators.required]),
      retailPrice: new FormControl(Number,[
        Validators.required])
    });

    this.initProductForm();
    this.getProduct();
    this.loadProductType();
    this.loadPackaging();
  }

  initProductForm(){
    this.productForm.reset();
    this.productForm.setValue({
      $key : '',
      name : '',
      packaging : 0,
      productType : 0,
      unitPrice : '',
      retailPrice : '',
    });
  }

  getErrorMessage(control:string) {
    if(control=='$key')
    return this.productForm.get(control).hasError('required') ? 'Ingrese un código SAP' :
            '';
    if(control=='name')
    return this.productForm.get(control).hasError('required') ? 'Ingrese un nombre de producto' :
            '';
    if(control=='unitPrice')
    return this.productForm.get(control).hasError('required') ? 'Ingrese un precio unitario' :
            '';
    if(control=='retailPrice')
    return this.productForm.get(control).hasError('required') ? 'Precio de venta' :
            '';
  }

  onSubmit(){
    console.log("Funciona");
    this.addProduct();
  }

  getProduct(){
    this.dbService.getListProduct().snapshotChanges().subscribe(item => {
      this.dataSource = Array<Product>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.dataSource.push(x as Product);
        console.log(this.dataSource.length);
      })
    });
  }

  addProduct(){
    let newProduct = new Product();
    newProduct = this.productForm.value as Product;
    newProduct.enable = true;
    console.log(newProduct);
    this.dbService.insertListProduct(newProduct);
    this.initProductForm();
  }

  updateProduct(){
    let newProduct = new Product();
    newProduct = this.productForm.value as Product;
    newProduct.enable = true;
    this.dbService.updateListProduct(newProduct);
    this.initProductForm();
  }
  
  modifyProduct(key : string){
    let modProduct = new Product();
    modProduct = this.dataSource[key];
    this.productForm.setValue({
      key : modProduct.$key,
      name : modProduct.name,
      packaging : modProduct.packaging,
      productType : modProduct.productType,
      unitPrice : modProduct.unitPrice,
      retailPrice : modProduct.retailPrice,
    });
    console.log(modProduct);
  }

  deleteProduct(key : Product){
    this.dbService.deleteListProduct(key);
  }

  loadProductType(){
    this.dbService.getListTpProduct().snapshotChanges().subscribe(item => {
      this.tpProductList = Array<ProductType>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.tpProductList.push(x as ProductType);
      })
    });
  }

  loadPackaging(){
    this.dbService.getListPackaging().snapshotChanges().subscribe(item => {
      this.tpPackaging = Array<Packaging>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.tpPackaging.push(x as Packaging);
      })
    });
  }

  getProductType(key : string){
    return this.tpProductList[key];
  }

  getPackaging(key : string){
    return this.tpPackaging[key];
  }

}
