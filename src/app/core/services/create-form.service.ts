import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import { IUniFacultyCard, Icard ,IEventCard } from '../models/common.model';
// import {Icard} from "../models/common.model";

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {
  private dbPath = '/UniCard'
  private dbHomeUnicard = "/HomeUniCard"
  private dbUniFacultyPath = "/UniFacultyCard"
  private dbEventPath = "/EventCard"
  private dbHomeFacultyPath = "/HomeUniFacultyCard"
  UniCardRef:AngularFireList<any>
  HomeUniCardRef:AngularFireList<any>
  UniFacultyCardRef:AngularFireList<any>
  HomeUniFacultyCardRef:AngularFireList<any>
  EventCardRef:AngularFireList<any>
  constructor(private db : AngularFireDatabase,private UniFacultyCardDb:AngularFireDatabase, private EventcCardDb:AngularFireDatabase,private HomeUniCardDb:AngularFireDatabase,private HomeUniFacultyCardDb:AngularFireDatabase) {
    this.UniCardRef = db.list(this.dbPath)
    this.UniFacultyCardRef = UniFacultyCardDb.list(this.dbUniFacultyPath)
    this.EventCardRef = EventcCardDb.list(this.dbEventPath)
    this.HomeUniCardRef = HomeUniCardDb.list(this.dbHomeUnicard)
    this.HomeUniFacultyCardRef = HomeUniFacultyCardDb.list(this.dbHomeFacultyPath)
  }

  //უნივერსიტეტის გვერდის თემები
  getAllUniCard(){
    return this.UniCardRef;
  }
  AddUniCard(Card: Icard ){
    this.UniCardRef.push(Card)
  }
  getUniCardById(key :any){
    return this.db.object(`/UniCard/${key}`).valueChanges();
  }
  updateUniCard(key:string,Card: Icard){
    this.UniCardRef.update(key,Card)
  }
  deleteHomeUniCard(key:string){
    return  this.UniCardRef.remove(key)
  } 


  //ჰოუმის უნივერსიტეტების ჩამონათვალის თემები
  getHomeAllUniCard(){
    return this.HomeUniCardRef;
  }
  AddHomeUniCard(Card: Icard ){
    this.HomeUniCardRef.push(Card)
  }
  getHomeUniCardById(key :any){
    return this.HomeUniCardDb.object(`/HomeUniCard/${key}`).valueChanges();
  }
  updateHomeUniCard(key:string,Card: Icard){
    this.HomeUniCardRef.update(key,Card)
  }
  deleteUniCard(key:string){
    return  this.HomeUniCardRef.remove(key)
  }


//ყველა პროგრამის გვერდის თემები
  getAllUniFacultyCard(){
    return  this.UniFacultyCardRef
  }
  AddUniFacultyCard(Card:IUniFacultyCard){
    this.UniFacultyCardRef.push(Card)
  }
  getUniFacultyCardById(key:any){
    return this.UniFacultyCardDb.object(`/UniFacultyCard/${key}`).valueChanges();
  }
  updateUniFacultyCard(key:string,Card:IUniFacultyCard){
    this.UniFacultyCardRef.update(key,Card)
  }
  deleteUniFacultyCard(key:string){
    return  this.UniFacultyCardRef.remove(key)
  }



  //ჰოუმის პროგრამის თემები
  getAllHomeUniFacultyCard(){
    return  this.HomeUniFacultyCardRef
  }
  AddHomeUniFacultyCard(Card:IUniFacultyCard){
    this.HomeUniFacultyCardRef.push(Card)
  }
  getHomeUniFacultyCardById(key:any){
    return this.HomeUniFacultyCardDb.object(`/HomeUniFacultyCard/${key}`).valueChanges(); 
  }
  updateHomeUniFacultyCard(key:string,Card:IUniFacultyCard){
    this.HomeUniFacultyCardRef.update(key,Card)
  }
  deleteHomeUniFacultyCard(key:string){
    return  this.HomeUniFacultyCardRef.remove(key)
  }

//უნივერსიტეტის ივენთების გვერდის თემები
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
  
}
