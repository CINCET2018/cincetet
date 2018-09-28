import { Injectable } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
//import { ManageDBService } from './database.service';
import { Employee } from '../models/Employee';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: Observable<firebase.User>;// se le pone null para evitar que almacene el ultimo
  private userDetails: firebase.User = null;
  private subscrition1: Subscription;
  private subscrition2: Subscription;
  private once: Boolean;
  public tpUser: number = 2;
  public userData: Employee;

  constructor(private _firebaseAuth: AngularFireAuth, private dbService:DatabaseService) {
    this.user = null;
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          //console.log(this.userDetails.uid);
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithGoogle() {

    this.once = false;
    this.tpUser = 2;
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )

  }
  verifyUserLogged() {
    //rdevuelve un numero 
    //0: usuario dentro de los no aceptados
    //1: usuario dentro de los Aceptados 
    //2: usuario nuevo
    this.userData = null;
    this.tpUser = 2;
    if (this.userDetails.email!="cincet2018@gmail.com"){

    this.subscrition1 = this.dbService.getPendingUser(this.userDetails.uid.toString())
      .snapshotChanges()
      .subscribe(item => {
        console.log(item.length);
        if (item.length == 0) {
          this.subscrition2 = this.dbService.getEmployee(this.userDetails.uid.toString())
            .snapshotChanges()
            .subscribe(item => {
              console.log(item.length);
              if (item.length == 0) {
                this.dbService.insertListPendingUser({
                  $key: this.userDetails.uid.toString(),
                  name: this.userDetails.displayName.toString(),
                  email: this.userDetails.email.toString(),
                  phone:'',
                  enable:true
                });
                this.tpUser = 2;
              } else if((item[0].payload.toJSON() as Employee).enable == true){
                this.tpUser = 1;
              }else
                this.tpUser = 2;
            });
        }
        else
          this.tpUser = 0;
      });
    }
    else{
      this.tpUser=1;
    }

      



  }
  ngOnDestroy() {
    this.subscrition1.unsubscribe();
    this.subscrition2.unsubscribe();
  }
  isLoggedIn() {
    if (this.userDetails != null) {
      if (this.userDetails.uid == null) {
        //if (this.userDetails.uid != "j6EbJDZf3BWagJOekEgNvvZO8pn1") {

        this.once = false;
        this.tpUser = 2;
        return false;

      } else {

        if (!this.once) {
          this.once = true;
          this.verifyUserLogged();
          this.userData = {
            $key: this.userDetails.uid.toString(),
            name: this.userDetails.displayName.toString(),
            email: this.userDetails.email.toString(),
            phone : "",
            enable: true
          };
        }

        return true;
      }
    }
  }
  logOut() {
    return this._firebaseAuth.auth.signOut();
  }
}
