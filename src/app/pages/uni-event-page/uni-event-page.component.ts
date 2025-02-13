import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import {NavbarForPupilComponent}from '../navbar-for-pupil/navbar-for-pupil.component'
import {EventDto} from "../../core/models/common.model";
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
import {HomeUniCardService} from '../../home-uni-card.service'
@Component({
  selector: 'app-uni-event-page',
  standalone: true,
  imports: [FooterForPupilComponent,NgIf,RouterLink,CommonModule],
  templateUrl: './uni-event-page.component.html',
  styleUrl: './uni-event-page.component.scss'
})
export class UniEventPageComponent implements OnInit, OnDestroy {
  EventCard!:EventDto
  isLoggedIn = false;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone ,private route: ActivatedRoute,private HomeUniCardService:HomeUniCardService , private router: Router,    private User: AuthenticationService,
    ) {
  }
  ngOnInit() {
    this.HomeUniCardService.getEventCardById(this.getid(),this.getEventId())
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
    console.log(this.getEventId(), this.getid())
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
getEventId(){
  const EventId = this.route.snapshot.paramMap.get('n');
return EventId
}
}
