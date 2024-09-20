import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {IUniFacultyCard} from "../models/common.model";
import {Icard} from "../models/common.model";
import { Router } from '@angular/router';
import {  AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FooterForPupilComponent } from "../../pages/footer-for-pupil/footer-for-pupil.component";
import {ProgramCardService} from '../../program-card.service'
import {ProgramCardDto} from '../models/common.model'
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink} from '@angular/router';
import { gsap } from 'gsap';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-uni-program',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FooterForPupilComponent,RouterLink],
  templateUrl: './uni-program.component.html',
  styleUrl: './uni-program.component.scss',
})
export class UniProgramComponent implements OnInit, OnDestroy  {
cards: IUniFacultyCard[] = [];
  programCards: ProgramCardDto[] = [];
  circles = [1, 2, 3, 4, 5, 6];
  activeCircleIndex: number = 0;

  constructor(
    private router: Router,
    private programCardService: ProgramCardService,
    private cdr: ChangeDetectorRef, private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.getProgram(); // Fetch the program data when the component initializes
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
  getProgram(): void {
    this.programCardService.getProgramCard().subscribe({
      next: (programs) => {
        this.programCards = programs.map(program => {
          program.fields?.forEach(field => {
            field.programNames = field.programNames.map(program => {
              program.width = this.getButtonWidth(program.programname);
              return program;
            });
          });
          return program;
        });
        console.log('Program Cards:', this.programCards); // Check if data is correctly coming
      },
      error: (err) => {
        console.error('Error fetching program data:', err);
      }
    });
  }
  
  

  onCardClicked(cardkey: any, cardtitle: any): void {
    this.router.navigate(['/Pupil/UniFaculty/', cardkey, cardtitle]);
  }

  @ViewChildren('circle') circlesRef!: QueryList<ElementRef>;

  onCircleClick(index: number): void {
    this.activeCircleIndex = index;
  }

  // getButtonWidth(programName: string): string {
  //   // Function to generate a random width between 320px and 450px
  //   function getRandomWidth(min: number, max: number): string {
  //     const randomWidth = Math.floor(Math.random() * (max - min + 1)) + min;
  //     return `${randomWidth}px`;
  //   }
  
  //   // Return different widths based on the length of programname
  //   if (programName.length > 20) {
  //     return getRandomWidth(320, 450); // Random width between 320px and 450px for long names
  //   }
  
  //   return '240px'; // Default width for shorter names
  // }
  updateButtonWidths(): void {
    // Update button widths after window resize
    this.programCards.forEach((program) => {
      program.fields?.forEach((field) => {
        field.programNames = field.programNames.map((program) => {
          program.width = this.getButtonWidth(program.programname);
          return program;
        });
      });
    });
    this.cdr.detectChanges(); // Ensure change detection runs after resize
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Recalculate widths on window resize
    this.updateButtonWidths();
  }
  getButtonWidth(programName: string): string {
    // Function to generate a random width between min and max values
    function getRandomWidth(min: number, max: number): string {
      const randomWidth = Math.floor(Math.random() * (max - min + 1)) + min;
      return `${randomWidth}px`;
    }

    // Check if the window width is considered "mobile" (e.g., < 768px)
    const isMobile = window.innerWidth < 500;

    if (isMobile) {
      // For mobile, generate a random width between 180px and 240px

      return '280px'; // Default width for shorter names on mobile
    }
    else {
      // For non-mobile, use the original logic
      if (programName.length > 20) {
        return getRandomWidth(320, 450); // Random width between 320px and 450px for long names
      }
      return '240px'; // Default width for shorter names
    }
    
  }

  getPadding(Card: any): string {
    return Card.title.length < 20 ? '2px' : '10px';
  }

}
