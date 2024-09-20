import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {UniCardDto} from "../../core/models/common.model";
import { gsap } from 'gsap';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {HomeUniCardService} from '../../home-uni-card.service'
import { ElementRef, } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-home-uni-card',
  standalone: true,
  imports: [RouterLink, FooterForPupilComponent],
  templateUrl: './home-uni-card.component.html',
  styleUrl: './home-uni-card.component.scss'
})
export class HomeUniCardComponent implements OnInit, OnDestroy {
  cards:Icard[] = []
  UniCard:UniCardDto[]=[]

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone , private router: Router,private HomeUniCardService:HomeUniCardService) {
  }
  ngOnInit() {
    this.GetAllUniCard()
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
GetAllUniCard(){
  this.HomeUniCardService.getData().subscribe({
    next:(Unicard) => {
      this.UniCard = Unicard;
      console.log('Program Cards:', this.UniCard); // Check if data is correctly coming
    },
    error: (err) => {
      console.error('Error fetching program data:', err);
    }
  })
}
onCardClicked(cardkey:any) :void{
  this.router.navigate(['/Pupil/HomeUni/',cardkey])
}
}
