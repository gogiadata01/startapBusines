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
      // Log events and types to check data
      console.log('Filtering for category:', this.category);
      this.filteredEventCards = this.EventCard.filter(event => {
        return event.types.some(type => type.type === this.category); // Change 'Type' to 'type' to match your structure
      });
      console.log('Filtered events:', this.filteredEventCards);
    }
  }
  
  
  onCategoryClick(category: string) {
    console.log('Selected Category:', category);  // Check if this logs the correct category
    this.category = category;
    this.filterEvents(); // Apply filter after setting category
  }
  

onCardClicked(cardkey:any) :void{
  this.router.navigate(['/Pupil/Events/',cardkey])
}

}


// secodnavabr

