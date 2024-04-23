import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Icard} from "../models/common.model";

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {
  private dbPath = '/form'
  CardRef:AngularFireList<any>
  constructor(private db : AngularFireDatabase) {
    this.CardRef = db.list(this.dbPath)
  }
  getAllCard(){
    return this.CardRef;
  }
  AddCard(Card: Icard){
    this.CardRef.push(Card)
  }
  getCardById(key :string){
    return this.db.object(`${this.dbPath}/${key}`)
  }
  updateCard(key:string,Card: Icard){
    this.CardRef.update(key,Card)
  }
  deleteCard(key:string){
    return  this.CardRef.remove(key)
  }
}
