import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import { IUniFacultyCard, Icard ,IEventCard } from '../models/common.model';
// import {Icard} from "../models/common.model";

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {
  private dbPath = '/HomeUniCard'
  private dbUniFacultyPath = "/UniFacultyCard"
  private dbEventPath = "/EventCard"
  CardRef:AngularFireList<any>
  UniFacultyCardRef:AngularFireList<any>
  EventCardRef:AngularFireList<any>
  constructor(private db : AngularFireDatabase,private UniFacultyCardDb:AngularFireDatabase, private EventcCardDb:AngularFireDatabase) {
    this.CardRef = db.list(this.dbPath)
    this.UniFacultyCardRef = UniFacultyCardDb.list(this.dbUniFacultyPath)
    this.EventCardRef = EventcCardDb.list(this.dbEventPath)
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
  getAllEventCard(){
    return  this.EventCardRef
  }
  AddEventCard(Card:IEventCard){
    this.EventCardRef.push(Card)
  }
  getEventCardById(key:string){
    return this.EventcCardDb.object(`${this.dbEventPath} /${key} `)
  }
  updateEventCard(key:string,Card:IEventCard){
    this.EventCardRef.update(key,Card)
  }
  deleteEventCard(key:string){
    return this.EventCardRef.remove(key)
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
