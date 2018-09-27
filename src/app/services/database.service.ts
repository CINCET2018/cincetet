import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Packaging } from '../models/Packaging';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  private urlPackaging:string ='Orders';
  listPackaging: AngularFireList<any>;
  
  constructor(private firebase:AngularFireDatabase) { }

  //INICIALIZACION
  initListPackaging(){
    this.listPackaging = this.firebase.list(this.urlPackaging);
  }

  //GET DATA
  getListPackaging(){
    this.initListPackaging();
    return this.listPackaging;
  }



  //UPDATE
  updateListPackagings(packaging:Packaging){
    this.initListPackaging();
    this.listPackaging.update(packaging.$key,{description:packaging.description});
  }

  //INSERT
  insertListPackaging(packaging:Packaging){
    this.initListPackaging();
    this.listPackaging.push({description: packaging.description});
  }

  //DELETE
  deleteListPackaging($key: string){
    this.initListPackaging();
    this.listPackaging.remove($key);
  }
}

