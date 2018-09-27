import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup,FormControl,Validators } from '@angular/forms';
import { DatabaseService } from '../../Services/database.service';
import { Packaging } from '../../models/Packaging';

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.css']
})
export class PackagingComponent implements OnInit {
  AddPackagingForm : FormGroup;
  displayedColumns: string[] = ['description','Eliminar'];
  dataSource = [];
  // PackageList=[];
  constructor(private manageBD: DatabaseService) { }
  

  ngOnInit() {
    this.AddPackagingForm = new FormGroup({
      typeSnack: new FormControl('',[
        Validators.required])
    });
    // this.getPackagingList();
  }

  // getPackagingList(){
  //   this.manageBD.getListPackaging().snapshotChanges().subscribe(item => {
  //     this.dataSource = Array<Packaging>();
  //     item.forEach(element => {
  //       let x = element.payload.toJSON();
  //       x['$key'] = element.key;
  //       this.dataSource.push(x as Packaging)
  //       console.log(x);
  //     })
  //   });
  // }
  // addPackaging(){
  //   let objeto =new Packaging();
  //   objeto.description=this.AddPackagingForm.get('typePackaging').value;
  //   this.manageBD.insertListOptions(objeto);
  //   this.AddPackagingForm.reset();
  // }

  // delSnack(k: string ){
  //     this.dataSource.forEach(element => {
  //       if(!element.Enable){
  //         this.manageBD.deleteListPackaging(element.$Key);
  //       }
  //     });
  // }

  // getErrorMessage(control:string) {
  //   if(control=='typePackaging')
  //   return this.AddPackagingForm.get(control).hasError('required') ? 'Debe ingresar el tipo de embalaje' :'';
  // }

}
