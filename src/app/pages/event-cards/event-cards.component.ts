import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventCardDto, IEventCard} from "../../core/models/common.model";
import { data } from 'jquery';
import {EventCardService} from '../../event-card.service'
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgIf,NgFor } from '@angular/common';
@Component({
  selector: 'app-event-cards',
  standalone: true,
  imports: [RouterLink,NgIf,NgFor,CommonModule],
  templateUrl: './event-cards.component.html',
  styleUrl: './event-cards.component.scss'
})
export class EventCardsComponent {
  EventCard: EventCardDto[] = [];
  filteredEventCards: EventCardDto[] = [];
  categories: any = [
    { title: "ყველა" },
    { title: "ღია კარის დღე" },
    { title: "ბანაკი" },
    { title: "ვორკშოპი" },
    { title: "სიახლე" }
  ];
  category = "";

  constructor(private router: Router, private eventCardService: EventCardService) {}

  ngOnInit(): void {
    this.getAllEventCards();
  }

  getAllEventCards() {
    this.eventCardService.getAllEventCard().subscribe({
      next: (eventCards) => {
        this.EventCard = eventCards;
        this.filterEvents(); // Initial filtering
      },
      error: (err) => {
        console.error('Error fetching event data:', err);
      }
    });
  }

  filterEvents() {
    if (this.category === "ყველა" || this.category === "") {
      this.filteredEventCards = this.EventCard;
    } else {
      this.filteredEventCards = this.EventCard.filter(event =>
        event.types.some(type => type.Type === this.category)
      );
    }
  }

  onCategoryClick(category: string) {
    this.category = category;
    this.filterEvents(); // Filter events based on the selected category
  }

onCardClicked(cardkey:any) :void{
  this.router.navigate(['/Pupil/Events/',cardkey])
}

}


// secodnavabr

