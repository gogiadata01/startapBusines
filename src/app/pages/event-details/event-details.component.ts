import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import {NavbarForPupilComponent}from '../navbar-for-pupil/navbar-for-pupil.component'
import {EventCardDto} from "../../core/models/common.model";
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {EventCardService} from '../../event-card.service'
import { ActivatedRoute } from '@angular/router';
import { gsap } from 'gsap';
import {  AfterViewInit,  ViewChildren, QueryList } from '@angular/core';
import { ElementRef, } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import {AuthenticationService} from '../../authentication.service'
import { CommonModule, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FooterForPupilComponent,NgIf,NavbarForPupilComponent,RouterLink],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  EventCard!:EventCardDto
  isLoggedIn = false;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone ,private route: ActivatedRoute,private EventCardService: EventCardService, private router: Router,    private User: AuthenticationService,
    ) {
  }
  ngOnInit() {
    this.EventCardService.getEventCardById(this.getid())
    .subscribe({
      next:(Eventcard) =>{
        this.EventCard = Eventcard
        console.log('Event Cards:',this.EventCard); // Check if data is correctly coming

      },
      error: (err) => {
        console.error('Error fetching program data:', err);
      }
    })
    
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
    this.isLoggedIn = this.User.isUserLoggedIn(); // Check login status

}
formatEventText() {
  if (this.EventCard && this.EventCard.text) {
    let formattedText = this.EventCard.text;
    if (this.EventCard.link && formattedText.includes("დარეგისტრირდი")) {
      formattedText = formattedText.replace(
        "დარეგისტრირდი", 
        `დარეგისტრირდი <a href="${this.EventCard.link}" target="_blank" rel="noopener noreferrer">${this.EventCard.link}</a>`
      );
    }
    return formattedText;
  }
  return '';
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
getid(){
  const cardId = this.route.snapshot.paramMap.get('id');
return cardId
}
}
