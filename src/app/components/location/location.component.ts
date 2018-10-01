import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Location } from '../../models/Location';
import {MatSnackBar} from '@angular/material';
import { log } from 'util';
import { Customer } from '../../models/Customer';

/*  */
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locationForm:FormGroup;
  showDialog: boolean;
  locationList : Location[];
  latitud : number = 0;
  longitud : number = 0;
  markers : Location[];
  keyCustomer: string = '1';

  @Input() keyCustomers: Customer[];

  constructor(
    private locationService: DatabaseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
     this.locationForm = new FormGroup({
      $key:new FormControl(),
      latitud: new FormControl('',[
        Validators.required]),
      longitud: new FormControl('',[
          Validators.required]),        
      address: new FormControl('',[
        Validators.required]),
      city: new FormControl('',[
        Validators.required]),
      branchType: new FormControl('',[
        Validators.required])
    });  
    
    let listLocations =this.locationService.getLocations(this.keyCustomer)
     .snapshotChanges()
    .subscribe(item => {
      console.log(item);
      this.locationList = [];
      this.markers = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.locationList.push(x as Location);
        this.markers.push(x as Location);
      });
    });   
  }

  initlocationForm(){
    this.locationForm.reset();
    this.locationForm.setValue({
      $key:'',
      geolocation:'',
      address:'',
      city:'',
      branchType:''
    });
  }
  getErrorMessage(control:string) {
    if(control=='latitud')
    return this.locationForm.get(control).hasError('required') ? 'Debe Ingresar La Latitud' :
            '';
    if(control=='longitud')
    return this.locationForm.get(control).hasError('required') ? 'Debe Ingresar La Longitud' :
            '';            
    if(control=='address')
    return this.locationForm.get(control).hasError('required') ? 'Debe Ingresar La Dirección' :
            '';
    if(control=='city')
    return this.locationForm.get(control).hasError('required') ? 'Debe Ingresar El Municipio o Corregimiento' :
            '';
    if(control=='branchType')
    return this.locationForm.get(control).hasError('required') ? 'Debe Ingresar El Tipo De Negocio' :
                    '';            
  }
    
  onSubmit(){
    console.log("Funciona");
    this.insertLocations();
  }

  insertLocations(){
    console.log(this.locationForm);
    if(this.locationForm.value.$key == null){
      this.locationService.insertListLocation(this.keyCustomer, this.locationForm.value as Location);
    }else{
      this.locationService.updateListLocation(this.keyCustomer, this.locationForm.value as Location);
    }
    this.latitud = 0;
    this.longitud = 0;
    this.markers = this.locationList;
    this.locationForm.reset();
  }

  deleteLocations($key: string){
    console.log('eliminar');
    this.locationService.deleteListLocation(this.keyCustomer, $key);
    this.markers = this.locationList;
  }
  updateLocations(location: Location){
    console.log('actualizar');
    this.locationForm.setValue({
      $key:location.$key,
      latitud:location.latitud, 
      longitud:location.longitud, 
      address:location.address,
      city:location.city,
      branchType:location.branchType
    });
    this.latitud = parseFloat(location.latitud);
    this.longitud = parseFloat(location.longitud);
  }
  //Mesajes
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
