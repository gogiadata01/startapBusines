import { Component,OnInit,OnDestroy, NgZone, ViewChild ,ElementRef, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import {ProgramCardDto, UniCardDto, UniCardForFacultyDetails} from "../../core/models/common.model";
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { data } from 'jquery';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { snapshotChanges } from '@angular/fire/compat/database';
import { Observable, } from 'rxjs';
import { Router } from '@angular/router';
import {HomeUniCardService} from '../../home-uni-card.service'
import {ProgramCardService} from '../../program-card.service'
import { gsap } from 'gsap';
import {  AfterViewInit,  ViewChildren, QueryList } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-faculti-details',
  standalone: true,
  imports: [ NgIf,NgFor,NavbarForPupilComponent,FooterForPupilComponent,CommonModule,RouterLink],
  templateUrl: './faculti-details.component.html',
  styleUrl: './faculti-details.component.scss'
})
export class FacultiDetailsComponent implements OnInit,OnDestroy{
  ProgramCard!:ProgramCardDto
  UniCard:UniCardForFacultyDetails[]=[]
  ProgramName:any

  constructor(private ngZone: NgZone,private cdr: ChangeDetectorRef,private programCardService:ProgramCardService,private UniCardService: HomeUniCardService,private route: ActivatedRoute,private router: Router) {
  }

ngOnInit(): void {
   this.ProgramName = this.route.snapshot.paramMap.get('n')
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
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
slideUpNavbar() {
  gsap.to(this.secondNavbar.nativeElement, { y: -100, duration: 0.3, ease: 'power2.in' }); // Adjust -60 based on your navbar height
}
@ViewChild('secondNavbar') secondNavbar!: ElementRef;
private isNavbarVisible = false;
private destroy$ = new Subject<void>();
private photoHeight = 0;
GetAllUniCard(){
  this.UniCardService.getUniCardByProgramName(this.ProgramName).subscribe({
    next:(Unicard) => {
      this.UniCard = Unicard;
      console.log('Uni Cards:', this.UniCard); // Check if data is correctly coming
    },
    error: (err) => {
      console.error('Error fetching program data:', err);
    }
  })
}
getId(): string | null {
  return this.route.snapshot.paramMap.get('id');
}

getProgramName(): string | null {
  return this.route.snapshot.paramMap.get('n');
}

OnCardClicked(id: any, title: any) {
  const FacultyId = this.getId();
  const ProgramName = this.getProgramName();

  if ( ProgramName && id && title) {
    this.router.navigate(['/Pupil/UniFaculty', ProgramName, id, title]);
  } else {
    console.error('Error: One of the parameters is undefined', {
      FacultyId,
      ProgramName,
      id,
      title
    });
  }
}
trackByIndex(index: number): number {
  return index;
}

}

 
