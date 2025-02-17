import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventCardDto,} from "../../core/models/common.model";
import { data } from 'jquery';
import {EventCardService} from '../../event-card.service'
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgIf,NgFor } from '@angular/common';
import { gsap } from 'gsap';
import {  AfterViewInit,  ViewChildren, QueryList } from '@angular/core';
import { ElementRef, } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NavbarWithWaveComponent } from "../navbar-with-wave/navbar-with-wave.component";

@Component({
  selector: 'app-event-cards',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, CommonModule, NavbarWithWaveComponent],
  templateUrl: './event-cards.component.html',
  styleUrl: './event-cards.component.scss'
})
export class EventCardsComponent implements OnInit {
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

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone ,private router: Router, private eventCardService: EventCardService) {}

  ngOnInit(): void {
    this.getAllEventCards();

  }


  getAllEventCards() {
    this.eventCardService.getAllEventCard().subscribe({
      next: (eventCards) => {
        this.EventCard = eventCards;
        this.sortEventCards(); 
        this.filterEvents(); 
        console.log(this.EventCard)
      },
      error: (err) => {
        console.error('Error fetching event data:', err);
      }
    });
  }

  sortEventCards() {
    this.EventCard.sort((a, b) => (a.numbering || 0) - (b.numbering || 0));
  }
  filterEvents() {
    if (this.category === "ყველა" || this.category === "") {
      this.filteredEventCards = this.EventCard;
    } else {
      this.filteredEventCards = this.EventCard.filter(event => 
        event.types.some(type => type.type === this.category)
      );
    }
  }
  
  
  onCategoryClick(category: string) {
    this.category = category;
    this.filterEvents(); // Apply filter after setting category
  }


onCardClicked(cardkey:any) :void{
  this.router.navigate(['/Pupil/Events/',cardkey])
}
getColor(type: string | { type: string }): string {
  const typeStr = typeof type === 'string' ? type : type.type;
  switch (typeStr) {
    case 'ღია კარის დღე':
      return 'blue';
    case 'ბანაკი':
      return 'green';
    case 'ვორკშოპი':
      return 'red';
    case 'სიახლე':
      return 'gray';
    default:
      return 'black';
  }
}


}