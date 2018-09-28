import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  productForm : FormGroup;
  dataSource = [];

  constructor(private dbService : DatabaseService) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      key: new FormControl('',[
        Validators.required]),
      description: new FormControl('',[
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
  }

  initProductForm(){
    this.productForm.reset();
    this.productForm.setValue({
      key : '',
      description : '',
      packaging : 0,
      productType : 0,
      unitPrice : '',
      retailPrice : '',
    });
  }

  getErrorMessage(control:string) {
    if(control=='key')
    return this.productForm.get(control).hasError('required') ? 'Ingrese un código SAP' :
            '';
    if(control=='description')
    return this.productForm.get(control).hasError('required') ? 'Ingrese una descripción' :
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
        console.log(x);
      })
    });
  }

  addProduct(){
    let newProduct = new Product();
    newProduct = this.productForm.value as Product;
    newProduct.enable = true;
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
  
  modifyProduct(){
    
  }

  deleteProduct(key : string){
    //this.dbService.deleteListProduct(key);
  }

}
