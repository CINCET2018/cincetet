import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup,FormControl,Validators } from '@angular/forms';
import { Customer } from '../../models/Customer';
import { DatabaseService } from '../../services/database.service';
import { element } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  AddCustomerFrom : FormGroup;
  dataSource = [];
  displayedColumns: string[] = ['name', 'document', 'contactPerson', 'cellphone', 'location', 'update'];
  customersList=[];
  mostrarDatos: boolean;
  updateEnable=false;
  selectedElement:Customer;

  constructor(private manageBD : DatabaseService) { }

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

  }

  activarActualizar() : void{
    this.mostrarDatos = true;
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
    this.activarActualizar();
  }

}
