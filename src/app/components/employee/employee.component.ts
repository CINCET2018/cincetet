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
  displayedColumnsEmployee: string[] = ['Nombre', 'email','phone','delete'];

  constructor(private manageBD: DatabaseService) { }

  getEmployeeList(){
    this.manageBD.getListEmployee().snapshotChanges()
    .subscribe(item => {
      this.dataSourceEmployee = Array<Employee>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.dataSourceEmployee.push(x as Employee)
        console.log(x);
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
        this.dataSourceUserPending.push(x as Employee)
        console.log(x);
      })
    });
  }

  ngOnInit() {
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
    this.manageBD.deleteListEmployee(k);
  }

}
