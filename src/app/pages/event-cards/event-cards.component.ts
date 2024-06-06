import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateFormService} from "../../core/services/create-form.service";
import {IEventCard} from "../../core/models/common.model";
import { data } from 'jquery';
@Component({
  selector: 'app-event-cards',
  standalone: true,
  imports: [],
  templateUrl: './event-cards.component.html',
  styleUrl: './event-cards.component.scss'
})
export class EventCardsComponent {
  cards:IEventCard[] = []
  constructor(private cardService: CreateFormService) {
    
  }
  ngOnInit(): void {
    this.getAllCard()
  }
  getAllCard(){
    this.cardService
    .getAllEventCard()
    .snapshotChanges()
    .subscribe({
      next:(data) => {
        this.cards= [];
        data.forEach((item) => {
          let Card = item.payload.toJSON() as IEventCard
          this.cards.push({
            key:item.key || "",
            url:Card.url,
            title:Card.title,
            text:Card.text
          })
        } )
      }
    })
  }
}
