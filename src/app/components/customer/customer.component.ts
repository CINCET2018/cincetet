import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup,FormControl,Validators } from '@angular/forms';
import { Customer } from '../../models/Customer';
import { DatabaseService } from '../../services/database.service';
import { element } from '@angular/core/src/render3/instructions';
import { MatDialog } from '@angular/material';
import { TableLocationComponent } from '../table-location/table-location.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit {

  AddCustomerFrom : FormGroup;
  dataSource = [];
  displayedColumns: string[] = ['name', 'document', 'contactPerson', 'cellphone', 'location','update'];
  customersList=[];
  mostrarDatos: boolean;
  updateEnable=false;
  selectedElement:Customer;
  keyCustoemers = [];

  constructor(private manageBD : DatabaseService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(TableLocationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addCustomer(){
    
      let objeto =new Customer();
      objeto.name=this.AddCustomerFrom.get('name').value;
      objeto.document=this.AddCustomerFrom.get('document').value;
      objeto.contactPerson=this.AddCustomerFrom.get('contactPerson').value;
      objeto.cellphone=this.AddCustomerFrom.get('cellphone').value;
      objeto.location=this.AddCustomerFrom.get('location').value;
      objeto.enable=true;
      this.manageBD.insertListCustomer(objeto);
      this.AddCustomerFrom.reset();
    }

  getErrorMessage(control:string) {
    if(control=='name')
    return this.AddCustomerFrom.get(control).hasError('required') ? 'Debe ingresar el nombre' :
          '';

    if(control == 'docmuent')
      return this.AddCustomerFrom.get(control).hasError('required') ? 'Debe ingresar el documento' :
            '';

    if(control = 'contactPerson')  
      return this.AddCustomerFrom.get(control).hasError('required') ? 'Debe ingresar una persona de Contacto' :
            '';

    if(control = 'cellphone')
      return this.AddCustomerFrom.get(control).hasError('required') ? 'Debe ingresar numero de telefono' :
            '';

    if(control = 'location')  
    return this.AddCustomerFrom.get(control).hasError('required') ? 'Debe ingresar ubicacion' :
          '';
    }

    getCustomerList(){
      this.manageBD.getListCustomer().snapshotChanges().subscribe(item => {
        this.dataSource = Array<Customer>();
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.dataSource.push(x as Customer)
          //console.log(x);
        })
      });
    }

    modifyCustomer(){
      let objeto =this.selectedElement;
      objeto.name=this.AddCustomerFrom.get('name').value;
      objeto.enable=true;
      this.manageBD.updateListCustomer(objeto);
      this.AddCustomerFrom.reset();
      this.updateEnable=false;
    }

    selectOperation(){
      if (this.updateEnable) {
        this.modifyCustomer();
      } else {
        this.addCustomer();
      }
    }

  ngOnInit() {
    this.AddCustomerFrom = new FormGroup({
      name: new FormControl('',[
        Validators.required]),
      document: new FormControl('',[
        Validators.required]),
      contactPerson: new FormControl('',[
        Validators.required]),
      cellphone: new FormControl('',[
        Validators.required]),
       location: new FormControl('',[
        Validators.required])
    });

    this.getCustomerList();
    this.updateEnable=false;
    this.getMyCustomer();

  }

  startModifyCustomer(element:Customer){
    this.updateEnable=true;
    this.selectedElement=element;
    this.AddCustomerFrom.setValue({
      name: element.name,
      document : element.document,
      contactPerson: element.contactPerson,
      cellphone: element.cellphone,
      location: element.location
    });
  }

  getCustomer(key: string){
    let retorno="No encontrado";
    this.keyCustoemers.forEach(element => {
      // console.log(key+"***"+element.$key);
      if(element.$key==key){
        // console.log("igual: ");
        retorno = element.name;
      }
    });
    return retorno;
  }
  getMyCustomer(){
    this.manageBD.getListCustomer().snapshotChanges().subscribe(item => {
      this.keyCustoemers = Array<Customer>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.keyCustoemers.push(x as Customer)
        // console.log(x);
      })
    });
  }
}
