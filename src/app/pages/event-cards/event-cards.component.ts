import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventCardDto, IEventCard} from "../../core/models/common.model";
import { data } from 'jquery';
import {EventCardService} from '../../event-card.service'
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-event-cards',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './event-cards.component.html',
  styleUrl: './event-cards.component.scss'
})
export class EventCardsComponent {
  EventCard:EventCardDto[] = []
  
  constructor(private router: Router,private EventCardService: EventCardService) {
    
  }
  ngOnInit(): void {
    // this.getAllCard()
    this.GetAllEventCard()
  }
  // getAllCard(){
  //   this.cardService
  //   .getAllEventCard()
  //   .snapshotChanges()
  //   .subscribe({
  //     next:(data) => {
  //       this.cards= [];
  //       data.forEach((item) => {
  //         let Card = item.payload.toJSON() as IEventCard
  //         this.cards.push({
  //           key:item.key || "",
  //           url:Card.url,
  //           title:Card.title,
  //           text:Card.text
  //         })
  //       } )
  //     }
  //   })
  // }
GetAllEventCard(){
  this.EventCardService.getAllEventCard()
  .subscribe({
    next:(Eventcard) => {
      this.EventCard = Eventcard
      console.log('Program Cards:',this.EventCard); // Check if data is correctly coming

    },
    error: (err) => {
      console.error('Error fetching program data:', err);
    }
  })
}
onCardClicked(cardkey:any) :void{
  this.router.navigate(['/Pupil/Events/',cardkey])
}

}
