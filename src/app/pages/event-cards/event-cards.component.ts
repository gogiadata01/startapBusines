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

@Component({
  selector: 'app-event-cards',
  standalone: true,
  imports: [RouterLink,NgIf,NgFor,CommonModule],
  templateUrl: './event-cards.component.html',
  styleUrl: './event-cards.component.scss'
})
export class EventCardsComponent implements OnInit, OnDestroy {
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
    const photoElement = document.querySelector('.photo-class') as HTMLElement;
    if (photoElement) {
      this.photoHeight = photoElement.offsetHeight;
    }

    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.onWindowScroll();
        });
    });
  }
  onWindowScroll() {
    const scrolled = window.scrollY > 200;
  
    if (scrolled && !this.isNavbarVisible) {
      this.isNavbarVisible = true;
      this.slideDownNavbar();
      const button =  document.getElementById("firstNavbarl")
      if (button){
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        if(isExpanded){
          button.click()}
      }
    } else if (!scrolled && this.isNavbarVisible) {
      this.isNavbarVisible = false;
      this.slideUpNavbar();
      const button =  document.getElementById("secondNavbar2")
    
      if (button){
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        if(isExpanded){button.click()}
      }
    }
  }
  slideDownNavbar() {
    gsap.to(this.secondNavbar.nativeElement, { y: 0, duration: 0.3, ease: 'power2.out' });
  }
  
  slideUpNavbar() {
    gsap.to(this.secondNavbar.nativeElement, { y: -100, duration: 0.3, ease: 'power2.in' }); // Adjust -60 based on your navbar height
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  @ViewChild('secondNavbar') secondNavbar!: ElementRef;
  private isNavbarVisible = false;
  private destroy$ = new Subject<void>();
  private photoHeight = 0;

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
getColor(type: string): string {
  switch (type) {
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


// secodnavabr

