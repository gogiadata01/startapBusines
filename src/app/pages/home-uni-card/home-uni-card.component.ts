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
@Component({
  selector: 'app-home-uni-card',
  standalone: true,
  imports: [RouterLink,NgFor,ReactiveFormsModule, FooterForPupilComponent],
  templateUrl: './home-uni-card.component.html',
  styleUrl: './home-uni-card.component.scss'
})
export class HomeUniCardComponent implements OnInit, OnDestroy {
  UniCard:UniCardDto[]=[]
  Search: FormGroup;
  filteredUniCards: UniCardDto[] = []; // Holds filtered UniCards based on search

  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef, private ngZone: NgZone , private router: Router,private HomeUniCardService:HomeUniCardService) {
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
GetAllUniCard(){
  this.HomeUniCardService.getData().subscribe({
    next:(Unicard) => {
      this.UniCard = Unicard;
      this.filteredUniCards = []; // Clear any filtered data
      console.log('Program Cards:', this.UniCard); // Check if data is correctly coming
    },
    error: (err) => {
      console.error('Error fetching program data:', err);
    }
  })
}

// Function to trigger on search
onSearch() {
  const searchTitle = this.Search.get('title')?.value;
  
  if (searchTitle) {
    // Fetch the filtered UniCards by title
    this.HomeUniCardService.getUniCardByTitleMainTextUrl(searchTitle).subscribe({
      next: (filteredData) => {
        this.filteredUniCards = filteredData; // Update the filtered list
      },
      error: (err) => {
        console.error('Error in search:', err);
      }
    });
  } else {
    // If the search is cleared, reset to show all UniCards
    this.filteredUniCards = [];
  }
}
onCardClicked(cardkey:any) :void{
  this.router.navigate(['/Pupil/HomeUni/',cardkey])
}
}
// getUniCardByTitleMainTextUrl(title: string): Observable<UniCardDto[]> {
//   const params = new HttpParams().set('title', title); // Create HttpParams object

//   return this.HomeUniCardService.getUniCardByTitleMainTextUrl(params).pipe(
//     catchError((error) => {  // Handle errors
//       console.error('Error in search:', error);
//       return [];  // Return an empty array if an error occurs
//     })
//   );
// }
