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
  displayedColumns: string[] = ['description','Eliminar','update'];
  dataSource = [];
  updateEnable=false;
  selectedElement:Packaging;

  constructor(private manageBD: DatabaseService) { }
  

  ngOnInit() {
    this.AddPackagingForm = new FormGroup({
      typePackaging: new FormControl('',[
        Validators.required])
    });
    this.getPackagingList();
  }

  getPackagingList(){
    this.manageBD.getListPackaging().snapshotChanges().subscribe(item => {
      this.dataSource = Array<Packaging>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        if((x as Packaging).enable==null){
          x['enable']=true;
        }
        if((x as Packaging).enable){
          this.dataSource.push(x as Packaging)
        }
        console.log(x);
      })
    });
  }
  addPackaging(){
    let objeto =new Packaging();
    objeto.description=this.AddPackagingForm.get('typePackaging').value;
    objeto.enable=true;
    this.manageBD.insertListPackaging(objeto);
    this.AddPackagingForm.reset();
    this.updateEnable=false;
  }
  updatePackaging(){
    let objeto =this.selectedElement;
    objeto.description=this.AddPackagingForm.get('typePackaging').value;
    objeto.enable=true;
    this.manageBD.updateListPackagings(objeto);
    this.AddPackagingForm.reset();
    this.updateEnable=false;
  }

  delPackaging(k: Packaging ){
      this.manageBD.deleteListPackaging(k);
  }

  getErrorMessage(control:string) {
    if(control=='typePackaging')
    return this.AddPackagingForm.get(control).hasError('required') ? 'Debe ingresar el tipo de embalaje' :'';
  }

  startModifyBranchType(element:Packaging){
    this.updateEnable=true;
    this.selectedElement=element;
    this.AddPackagingForm.setValue({
      typePackaging: element.description
    })
  }

  selectOperation(){
    if (this.updateEnable) {
      this.updatePackaging();
    } else {
      this.addPackaging();
    }
  }
}
