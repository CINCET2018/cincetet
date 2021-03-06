import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { NgForm, FormGroup,FormControl,Validators } from '@angular/forms';
import { DatabaseService } from '../../Services/database.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  title = 'User';
  dataSourceUserPending: Employee[]= [];
  dataSourceEmployee: Employee[]= [];
  displayedColumns: string[] = ['Nombre', 'email','phone', 'Aprobar', 'Denegar'];
  displayedColumnsEmployee: string[] = ['Nombre', 'email','phone','delete','update'];
  editActive:string[]=[];
  editEmployeeForm:FormGroup;

  constructor(private manageBD: DatabaseService) { }

  getEmployeeList(){
    this.manageBD.getListEmployee().snapshotChanges()
    .subscribe(item => {
      this.dataSourceEmployee = Array<Employee>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        if((x as Employee).enable==null){
          x['enable']=true;
        }
        if((x as Employee).phone==null){
          x['phone'] = '';
        }
        if((x as Employee).enable){
          this.dataSourceEmployee.push(x as Employee)
        }
      })
    });
  }
  
  getPendingUserList(){
    this.manageBD.getListPendingUser().snapshotChanges()
    .subscribe(item => {
      this.dataSourceUserPending = Array<Employee>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        x['enable'] = true;
        this.dataSourceUserPending.push(x as Employee)
        console.log(this.dataSourceUserPending);
      })
      
    });
  }

  ngOnInit() {
    this.editEmployeeForm = new FormGroup({
      phoneEmployee: new FormControl('')
    });
    this.getPendingUserList();
    this.getEmployeeList();
  }

  aproveEmployee(element: Employee){
    this.manageBD.insertListEmployee(element);
    this.manageBD.deleteListPendingUser(element.$key);
  }

  denyEmployee(element: Employee){
    this.manageBD.deleteListPendingUser(element.$key);
  }

  delEmployee(k: Employee ){
    console.log(k);
    this.manageBD.deleteListEmployee(k);
  }

  edit(k: string){
    this.editActive.push(k);
  }
  noEdit(k: string){
    let indice=this.editActive.findIndex(function (key) { return key === k; });
    if(indice>-1){
      this.editActive.splice(indice,1);
    }
  }
  savePhone(k: Employee){
    let objeto=k;
    objeto.phone=this.editEmployeeForm.get('phoneEmployee').value;
    this.manageBD.updateListEmployee(objeto);
    this.noEdit(k.$key);
  }
  active(k: string){
    let indice=this.editActive.findIndex(function (key) { return key === k; });
    return indice;
  }
  
}
