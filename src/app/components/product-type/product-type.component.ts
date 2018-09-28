import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup,FormControl,Validators } from '@angular/forms';
import { DatabaseService } from '../../Services/database.service';
import { ProductType } from '../../models/ProductType'

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  AddProductTypeForm : FormGroup;
  displayedColumns: string[] = ['description','Eliminar'];
  dataSource = [];
  constructor(private manageBD: DatabaseService) { }
  

  ngOnInit() {
    this.AddProductTypeForm = new FormGroup({
      typeProduct: new FormControl('',[
        Validators.required])
    });
    this.getProductTypeList();
  }

  getProductTypeList(){
    this.manageBD.getListTpProduct().snapshotChanges().subscribe(item => {
      this.dataSource = Array<ProductType>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.dataSource.push(x as ProductType)
        console.log(x);
      })
    });
  }
  addProductType(){
    let objeto =new ProductType();
    objeto.description=this.AddProductTypeForm.get('typeProduct').value;
    objeto.enable=true;
    this.manageBD.insertListTpProduct(objeto);
    this.AddProductTypeForm.reset();
  }

  delProductType(k: ProductType ){
      this.manageBD.deleteListTpProduct(k);
  }

  getErrorMessage(control:string) {
    if(control=='typeProduct')
    return this.AddProductTypeForm.get(control).hasError('required') ? 'Debe ingresar el tipo de producto' :'';
  }


}
