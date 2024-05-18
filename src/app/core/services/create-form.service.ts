import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import { IUniFacultyCard, Icard } from '../models/common.model';
// import {Icard} from "../models/common.model";

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {
  private dbPath = '/HomeUniCard'
  private dbUniFacultyPath = "/UniFacultyCard"
  CardRef:AngularFireList<any>
  UniFacultyCardRef:AngularFireList<any>
  constructor(private db : AngularFireDatabase,private UniFacultyCardDb:AngularFireDatabase) {
    this.CardRef = db.list(this.dbPath)
    this.UniFacultyCardRef = UniFacultyCardDb.list(this.dbUniFacultyPath)
  }
  getAllHomeUniCard(){
    return this.CardRef;
  }
  AddHomeUniCard(Card: Icard ){
    this.CardRef.push(Card)
  }
  getHomeUniCardById(key :string){
    return this.db.object(`${this.dbPath}/${key}`)
  }
  updateHomeUniCard(key:string,Card: Icard){
    this.CardRef.update(key,Card)
  }
  deleteHomeUniCard(key:string){
    return  this.CardRef.remove(key)
  }
  getAllUniFacultyCard(){
    return  this.UniFacultyCardRef
  }
  AddUniFacultyCard(Card:IUniFacultyCard){
    this.UniFacultyCardRef.push(Card)
  }
  getUniFacultyCardById(key:string){
    return this.UniFacultyCardDb.object(`${this.dbUniFacultyPath} /${key} `)
  }
  updateUniFacultyCard(key:string,Card:IUniFacultyCard){
    this.UniFacultyCardRef.update(key,Card)
  }
  deleteUniFacultyCard(key:string){
    return  this.UniFacultyCardRef.remove(key)
  }
  
  // private dbPath = '/Card';
  // UserRef : AngularFireList<any> 
  // constructor(private db :AngularFireDatabase){
  //   this.UserRef = db.list(this.dbPath)
  // }
  // getAllUser (){
  //   return this.UserRef
  // }
  // addUser(User : Iuser){
  //   this.UserRef.push(User)
  // }
  // getUserByid(key :string){
  //   return this.db.object(`${this.dbPath}/${key}`)
  // }
  // updateUser(key:string, User : Iuser){
  //   this.UserRef.update(key,User)
  // }
  // deleteUser(key:string,){
  //   return this.UserRef.remove(key)
  // }
}
