import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BranchType } from '../../models/BranchType';

@Component({
  selector: 'app-branch-type',
  templateUrl: './branch-type.component.html',
  styleUrls: ['./branch-type.component.css']
})
export class BranchTypeComponent implements OnInit {

  branchTypeForm : FormGroup;
  displayedColumns: string[] = ['description','update','delete'];
  dataSource = [];
  selectedElement:BranchType;
  updateEnable=false;

  constructor(private manageBD: DatabaseService) { }

  ngOnInit() {
    this.branchTypeForm = new FormGroup({
    description: new FormControl('',[
      Validators.required])
  });
  this.getBranchTypeList();
  this.updateEnable=false;
  }
  getBranchTypeList(){
    this.manageBD.getListTpBranch().snapshotChanges().subscribe(item => {
      this.dataSource = Array<BranchType>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.dataSource.push(x as BranchType)
        //console.log(x);
      })
    });
  }
  

  selectOperation(){
    if (this.updateEnable) {
      this.modifyBranchType();
    } else {
      this.addBranchType();
    }
  }

  addBranchType(){
    let objeto =new BranchType();
    objeto.description=this.branchTypeForm.get('description').value;
    objeto.enable=true;
    this.manageBD.insertListTpBranch(objeto);
    this.branchTypeForm.reset();
    this.updateEnable=false;
  }
  modifyBranchType(){
    let objeto =this.selectedElement;
    objeto.description=this.branchTypeForm.get('description').value;
    objeto.enable=true;
    this.manageBD.updateListTpBranch(objeto);
    this.branchTypeForm.reset();
    this.updateEnable=false;
  }
  deleteBranchType(element:BranchType){
    this.manageBD.deleteListTpBranch(element);
  }
  startModifyBranchType(element:BranchType){
    this.updateEnable=true;
    this.selectedElement=element;
    this.branchTypeForm.setValue({
      description: element.description
    })
  }
  getErrorMessage(control:string) {
    if(control=='description')
    return this.branchTypeForm.get(control).hasError('required') ? 'Debe ingresar el tipo de negocio' :'';
  }
}
