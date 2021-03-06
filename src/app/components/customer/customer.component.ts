import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup,FormControl,Validators } from '@angular/forms';
import { Customer } from '../../models/Customer';
import { DatabaseService } from '../../services/database.service';
import { element } from '@angular/core/src/render3/instructions';
import { MatDialog } from '@angular/material';
import { LocationComponent } from '../location/location.component';

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

  constructor(private manageBD : DatabaseService, public dialog: MatDialog) { }

  openDialog(element:Customer) {
    const dialogRef = this.dialog.open(LocationComponent, 
       {
        data: { name: element.$key }
      });
/*     dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); */
  }

  addCustomer(){
    
      let objeto =new Customer();
      objeto.name=this.AddCustomerFrom.get('name').value;
      objeto.document=this.AddCustomerFrom.get('document').value;
      objeto.contactPerson=this.AddCustomerFrom.get('contactPerson').value;
      objeto.cellphone=this.AddCustomerFrom.get('cellphone').value;
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
    });

    this.getCustomerList();
    this.updateEnable=false;

  }

  startModifyCustomer(element:Customer){
    this.updateEnable=true;
    this.selectedElement=element;
    this.AddCustomerFrom.setValue({
      name: element.name,
      document : element.document,
      contactPerson: element.contactPerson,
      cellphone: element.cellphone,
    });
  }
}
