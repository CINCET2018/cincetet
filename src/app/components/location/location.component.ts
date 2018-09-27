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


  constructor(
    private locationService: DatabaseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
     this.locationForm = new FormGroup({
      Geolocalización: new FormControl('',[
        Validators.required]),
      Dirección: new FormControl('',[
        Validators.required]),
      Municipio_Corregimiento: new FormControl('',[
        Validators.required]),
      Tipo_Negocio: new FormControl('',[
        Validators.required])
    });     
  }

  initStudentForm(){
    this.locationForm.reset();
    this.locationForm.setValue({Geolocalización:'',Dirección:'',Municipio_Corregimiento:''});
  }
  getErrorMessage(control:string) {
    if(control=='Geolocalización')
    return this.locationForm.get(control).hasError('required') ? 'Debe Ingresar La Geolocalización' :
            '';
    if(control=='Dirección')
    return this.locationForm.get(control).hasError('required') ? 'Debe Ingresar La Dirección' :
            '';
    if(control=='Municipio_Corregimiento')
    return this.locationForm.get(control).hasError('required') ? 'Debe Ingresar El Municipio o Corregimiento' :
            '';
    if(control=='Tipo_Negocio')
    return this.locationForm.get(control).hasError('required') ? 'Debe Ingresar El Tipo De Negocio' :
                    '';            
  }
  
  
  onSubmit(){
    console.log("Funciona");
    this.insertLocations();
  }
  insertLocations(){
/*     let tempStudent= new Location();
    tempStudent.Geolocalización=this.Geolocalización;
    tempStudent.Dirección=this.Dirección;
    tempStudent.Municipio_Corregimiento=this.Municipio_Corregimiento;
    tempStudent.Tipo_Negocio=this.Tipo_Negocio;   
    this.showDialog=true; */
    console.log(this.locationForm.value);
/*     this.locationService.insertLocation(this.locationForm.value as Location).subscribe(m=>{
      this.showDialog=false;
      this.openSnackBar("Datos Ingresados Correctamente", "Continuar");
      this.initStudentForm();
    }); */
  }

  //Mesajes
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  delete(){
    console.log('eliminar');

  }

  update(){
    console.log('actualizar');
  }
}
