import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Location } from '../../models/Location';
import {MatSnackBar} from '@angular/material';
import { log } from 'util';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locationForm:FormGroup;
  showDialog: boolean;
  locationList : Location[];


  constructor(
    private locationService: DatabaseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
     this.locationForm = new FormGroup({
      $key:new FormControl(),
      geolocation: new FormControl('',[
        Validators.required]),
      address: new FormControl('',[
        Validators.required]),
      city: new FormControl('',[
        Validators.required]),
      branchType: new FormControl('',[
        Validators.required])
    });  
    
    let listLocations =this.locationService.getLocations()
     .snapshotChanges()
    .subscribe(item => {
      console.log(item);
      this.locationList = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.locationList.push(x as Location);
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
    if(control=='geolocation')
    return this.locationForm.get(control).hasError('required') ? 'Debe Ingresar La Geolocalización' :
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
    this.initlocationForm();
  }

  insertLocations(){
    if(this.locationForm.value.$key == null){
      this.locationService.insertListLocation(this.locationForm.value as Location);
    }else{
      this.locationService.updateListLocation(this.locationForm.value as Location);
    }
    this.locationForm.reset();
  }

  deleteLocations($key: string){
    console.log('eliminar');
    this.locationService.deleteListLocation($key);
  }
  updateLocations(location: Location){
    console.log('actualizar');
    this.locationForm.setValue({
      $key:location.$key,
      geolocation:location.geolocation,
      address:location.address,
      city:location.city,
      branchType:location.branchType
    });
  }
  //Mesajes
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
