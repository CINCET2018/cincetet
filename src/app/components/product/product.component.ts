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
  displayedColumns: string[] = ['$key','name','productType','packaging','unitPrice','retailPrice','modify','delete'];
  dataSource = [];
  tpProductList = Array<ProductType>();
  tpPackaging = Array<Packaging>();
  updateEnable = false;


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

    this.updateEnable = false;

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

  selectOperation(){
    if (this.updateEnable) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  getProduct(){
    this.dbService.getListProduct().snapshotChanges().subscribe(item => {
      this.dataSource = Array<Product>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        if((x as Product).enable){
          this.dataSource.push(x as Product);
        }
      })
    });
  }

  addProduct(){
    let newProduct = new Product();
    newProduct = this.productForm.value as Product;
    newProduct.enable = true;
    console.log(newProduct);
    this.dbService.insertListProduct(newProduct);
    this.productForm.reset();
  }

  updateProduct(){
    let newProduct = new Product();
    newProduct = this.productForm.value as Product;
    newProduct.enable = true;
    this.dbService.updateListProduct(newProduct);
    this.productForm.reset();
  }
  
  modifyProduct(element : Product){
    this.updateEnable = true;
    this.productForm.setValue({
      $key : element.$key,
      name : element.name,
      packaging : element.packaging,
      productType : element.productType,
      unitPrice : element.unitPrice,
      retailPrice : element.retailPrice,
    });
  }

  deleteProduct(key : Product){
    this.dbService.deleteListProduct(key);
  }

  loadProductType(){
    this.dbService.getListTpProduct().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        if((x as ProductType).enable){
          this.tpProductList.push(x as ProductType);
        }
      })
    });
  }

  loadPackaging(){
    this.dbService.getListPackaging().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        if((x as Packaging).enable){
          this.tpPackaging.push(x as Packaging);
        }
      })
    });
  }

  getProductType(key : string){
    if (this.tpProductList == null)
      return '';
    var id = this.tpProductList.findIndex(x => x.$key == key);
    return this.tpProductList[id] != null && this.tpProductList[id].enable ? this.tpProductList[id].description : 'No registrado';
  }

  getPackaging(key : string){
    if (this.tpPackaging == null)
      return '';
    var id = this.tpPackaging.findIndex(x => x.$key == key);
    return this.tpPackaging[id] != null && this.tpPackaging[id].enable ? this.tpPackaging[id].description : 'No registrado';
  }

}
