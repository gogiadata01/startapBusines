import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import { Iuser } from '../models/common.model';
// import {Icard} from "../models/common.model";

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {
  // private dbPath = '/form'
  // CardRef:AngularFireList<any>
  // constructor(private db : AngularFireDatabase) {
  //   this.CardRef = db.list(this.dbPath)
  // }
  // getAllCard(){
  //   return this.CardRef;
  // }
  // AddCard(Card: Icard){
  //   this.CardRef.push(Card)
  // }
  // getCardById(key :string){
  //   return this.db.object(`${this.dbPath}/${key}`)
  // }
  // updateCard(key:string,Card: Icard){
  //   this.CardRef.update(key,Card)
  // }
  // deleteCard(key:string){
  //   return  this.CardRef.remove(key)
  // }
  private dbPath = '/User';
  UserRef : AngularFireList<any> 
  constructor(private db :AngularFireDatabase){
    this.UserRef = db.list(this.dbPath)
  }
  getAllUser (){
    return this.UserRef
  }
  addUser(User : Iuser){
    this.UserRef.push(User)
  }
  getUserByid(key :string){
    return this.db.object(`${this.dbPath}/${key}`)
  }
  updateUser(key:string, User : Iuser){
    this.UserRef.update(key,User)
  }
  deleteUser(key:string,){
    return this.UserRef.remove(key)
  }
}
