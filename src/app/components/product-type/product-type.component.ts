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
  displayedColumns: string[] = ['description','Modificar','Eliminar'];
  dataSource = [];
  updateEnable = false;
  selectedElement : ProductType;

  constructor(private manageBD: DatabaseService) { }
  

  ngOnInit() {
    this.AddProductTypeForm = new FormGroup({
      typeProduct: new FormControl('',[
        Validators.required])
    });
    this.getProductTypeList();
    this.updateEnable = false;
  }

  getProductTypeList(){
    this.manageBD.getListTpProduct().snapshotChanges().subscribe(item => {
      this.dataSource = Array<ProductType>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        if((x as ProductType).enable){
          this.dataSource.push(x as ProductType)
        }
      })
    });
  }
  addProductType(){
    let objeto =new ProductType();
    objeto.description=this.AddProductTypeForm.get('typeProduct').value;
    objeto.enable=true;
    this.manageBD.insertListTpProduct(objeto);
    this.AddProductTypeForm.reset();
    this.updateEnable = false;
  }

  delProductType(k: ProductType ){
      this.manageBD.deleteListTpProduct(k);
  }

  getErrorMessage(control:string) {
    if(control=='typeProduct')
    return this.AddProductTypeForm.get(control).hasError('required') ? 'Debe ingresar el tipo de producto' :'';
  }

  startModifyProductType(element:ProductType){
    this.updateEnable = true;
    this.selectedElement = element;
    this.AddProductTypeForm.setValue({
      typeProduct: element.description
    })
  }

  selectOperation(){
    if (this.updateEnable) {
      this.updateProductType();
    } else {
      this.addProductType();
    }
  }

  updateProductType(){
    let objeto = this.selectedElement;
    objeto.description = this.AddProductTypeForm.get('typeProduct').value;
    objeto.enable = true;
    this.manageBD.updateListPackagings(objeto);
    this.AddProductTypeForm.reset();
    this.updateEnable = false;
  }

}
