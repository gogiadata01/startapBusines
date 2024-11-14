import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {UniCardDto} from "../../core/models/common.model";
import { gsap } from 'gsap';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {HomeUniCardService} from '../../home-uni-card.service'
import { ElementRef, } from '@angular/core';
import { Observable, Subject, fromEvent } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';  // Add this import
import { catchError } from 'rxjs/operators';   
import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NavbarWithWaveComponent } from "../navbar-with-wave/navbar-with-wave.component";
import {UniversityVisitService} from '../../university-visit-service.service'
@Component({
  selector: 'app-home-uni-card',
  standalone: true,
  imports: [RouterLink, NgFor, ReactiveFormsModule, FooterForPupilComponent, NavbarWithWaveComponent],
  templateUrl: './home-uni-card.component.html',
  styleUrl: './home-uni-card.component.scss'
})
export class HomeUniCardComponent implements OnInit, OnDestroy {
  UniCard: UniCardDto[] = [];
  UniCardBytitle: UniCardDto[] = [];
  Search: FormGroup;
  filteredUniCards: UniCardDto[] = [];
  private priorityUniversity = 'ნიუ ვიჟენ უნივერსიტეტი'; // Single prioritized university

  constructor(private universityVisitService:UniversityVisitService,private fb: FormBuilder,private cdr: ChangeDetectorRef, private ngZone: NgZone , private router: Router,private HomeUniCardService:HomeUniCardService) {
    this.Search = this.fb.group({
      title: ['', Validators.required],
    })
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
GetAllUniCard() {
  this.HomeUniCardService.getData().subscribe({
    next: (Unicard) => {
      this.UniCard = Unicard;
      this.sortUniCards();
      this.filteredUniCards = []; // Clear any filtered data
      console.log('Program Cards:', this.UniCard);
    },
    error: (err) => {
      console.error('Error fetching program data:', err);
    }
  });
}
sortUniCards() {
  this.UniCardBytitle = this.UniCard.sort((a, b) => {
    // Check if either matches the priority university
    if (a.title === this.priorityUniversity && b.title !== this.priorityUniversity) {
      return -1;
    } else if (a.title !== this.priorityUniversity && b.title === this.priorityUniversity) {
      return 1;
    }
    // Use localeCompare with Georgian locale ('ka') for sorting
    return a.title.localeCompare(b.title, 'ka');
  });
}

// Function to trigger on search

onSearch() {
  const searchTitle = this.Search.get('title')?.value;
  if (searchTitle) {
    this.HomeUniCardService.getUniCardByTitleMainTextUrl(searchTitle).subscribe({
      next: (filteredData) => {
        this.filteredUniCards = filteredData;
        // Sort filtered results with the priority university at the top
        this.filteredUniCards.sort((a, b) => {
          if (a.title === this.priorityUniversity && b.title !== this.priorityUniversity) {
            return -1;
          } else if (a.title !== this.priorityUniversity && b.title === this.priorityUniversity) {
            return 1;
          }
          return a.title.localeCompare(b.title, 'ka');
        });
      },
      error: (err) => {
        console.error('Error in search:', err);
      }
    });
  } else {
    this.filteredUniCards = [];
  }
}
onCardClicked(cardkey:any,name:any) :void{
  this.universityVisitService.logVisit(name).subscribe({
    next: () => {
      console.log(`Visit logged for ${name}`);
    },
    error: (err) => {
      console.error('Error logging visit:', err);
    }
  });

  this.router.navigate(['/Pupil/HomeUni/',cardkey])
}
}

