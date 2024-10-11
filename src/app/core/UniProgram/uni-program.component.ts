// import { Component, HostListener, OnInit, OnDestroy, NgZone, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
// import { CommonModule, NgFor, NgIf } from '@angular/common';
// import { Router } from '@angular/router';
// import { FooterForPupilComponent } from "../../pages/footer-for-pupil/footer-for-pupil.component";
// import { ProgramCardService } from '../../program-card.service';
// import { ProgramCardDto } from '../models/common.model';
// import { ChangeDetectorRef } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { gsap } from 'gsap';
// import { Subject, fromEvent } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

// @Component({
//   selector: 'app-uni-program',
//   standalone: true,
//   imports: [CommonModule, NgIf, NgFor, FooterForPupilComponent, RouterLink],
//   templateUrl: './uni-program.component.html',
//   styleUrls: ['./uni-program.component.scss'],
// })
// export class UniProgramComponent implements OnInit, OnDestroy {
//   programCards: ProgramCardDto[] = [];
//   circles = [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15]; // Example circles representing programs/sections
//   activeCircleIndex: number = 0; // Track the active circle index

//   constructor(
//     private router: Router,
//     private programCardService: ProgramCardService,
//     private cdr: ChangeDetectorRef,
//     private ngZone: NgZone
//   ) {}

//   @ViewChildren('circle') circlesRef!: QueryList<ElementRef>;
//   @ViewChild('secondNavbar') secondNavbar!: ElementRef;

//   private isNavbarVisible = false;
//   private destroy$ = new Subject<void>();
//   private photoHeight = 0;

//   ngOnInit(): void {
//     this.getProgram(); // Fetch program data on initialization

//     const photoElement = document.querySelector('.photo-class') as HTMLElement;
//     if (photoElement) {
//       this.photoHeight = photoElement.offsetHeight;
//     }

//     this.ngZone.runOutsideAngular(() => {
//       fromEvent(window, 'scroll')
//         .pipe(takeUntil(this.destroy$))
//         .subscribe(() => {
//           this.onWindowScroll();
//         });
//     });
//   }

//   getProgram(): void {
//     this.programCardService.getProgramCard().subscribe({
//       next: (programs) => {
//         this.programCards = programs.map((program) => {
//           program.fields?.forEach((field) => {
//             field.programNames = field.programNames.map((programName) => {
//               programName.width = this.getButtonWidth(programName.programname);
//               return programName;
//             });
//           });
//           return program;
//         });
//         console.log('Program Cards:', this.programCards);
//         this.cdr.detectChanges(); // Ensure UI is updated after data change
//       },
//       error: (err) => {
//         console.error('Error fetching program data:', err);
//       }
//     });
//   }

//   onCardClicked( cardTitle: any): void {
//     this.router.navigate(['/Pupil/UniFaculty/',  cardTitle]);
//   }

//   onCircleClick(index: number): void {
//     this.activeCircleIndex = index; // Update active circle index when clicked
//     this.updateButtonWidths(); // Update button widths for the newly active circle
//     this.cdr.detectChanges(); // Ensure view is updated
//   }

//   updateButtonWidths(): void {
//     this.programCards.forEach((program) => {
//       program.fields?.forEach((field) => {
//         field.programNames = field.programNames.map((program) => {
//           program.width = this.getButtonWidth(program.programname);
//           return program;
//         });
//       });
//     });
//     this.cdr.detectChanges();
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: Event): void {
//     this.updateButtonWidths(); // Recalculate widths on window resize
//   }

//   getButtonWidth(programName: string): string {
//     function getRandomWidth(min: number, max: number): string {
//       const randomWidth = Math.floor(Math.random() * (max - min + 1)) + min;
//       return `${randomWidth}px`;
//     }

//     const isMobile = window.innerWidth < 500;

//     if (isMobile) {
//       return '280px'; // Default width for mobile
//     } else {
//       if (programName.length > 20) {
//         return getRandomWidth(320, 450); // Random width for long names
//       }
//       return '240px'; // Default width for shorter names
//     }
//   }

//   getPadding(card: any): string {
//     return card.title.length < 20 ? '2px' : '10px';
//   }

//   onWindowScroll() {
//     const scrolled = window.scrollY > 200;

//     if (scrolled && !this.isNavbarVisible) {
//       this.isNavbarVisible = true;
//       this.slideDownNavbar();
//       const button = document.getElementById("firstNavbarl");
//       if (button) {
//         const isExpanded = button.getAttribute("aria-expanded") === "true";
//         if (isExpanded) button.click();
//       }
//     } else if (!scrolled && this.isNavbarVisible) {
//       this.isNavbarVisible = false;
//       this.slideUpNavbar();
//       const button = document.getElementById("secondNavbar2");
//       if (button) {
//         const isExpanded = button.getAttribute("aria-expanded") === "true";
//         if (isExpanded) button.click();
//       }
//     }
//   }

//   slideDownNavbar() {
//     gsap.to(this.secondNavbar.nativeElement, { y: 0, duration: 0.3, ease: 'power2.out' });
//   }

//   slideUpNavbar() {
//     gsap.to(this.secondNavbar.nativeElement, { y: -100, duration: 0.3, ease: 'power2.in' });
//   }

//   ngOnDestroy() {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }
// }

import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  NgZone,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FooterForPupilComponent } from '../../pages/footer-for-pupil/footer-for-pupil.component';
import { ProgramCardService } from '../../program-card.service';
import { ProgramCardDto, FieldDto, ProgramNamesDto } from '../models/common.model';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-uni-program',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FooterForPupilComponent, RouterLink],
  templateUrl: './uni-program.component.html',
  styleUrls: ['./uni-program.component.scss'],
})
export class UniProgramComponent implements OnInit, OnDestroy {
  circles: number[] = Array.from({ length: 16 }, (_, i) => i);
  activeCircleIndex = 0;
  fields: FieldDto[] = [];
  currentFieldName: string | null = null;
  currentProgramNames: ProgramNamesDto[] = [];
  fieldProgramMapping: { [key: string]: ProgramNamesDto[] } = {};
  private destroy$ = new Subject<void>();
  private photoHeight: number = 0; // Ensure it's declared properly
  programCards: ProgramCardDto[] = []; // Ensure you have this declaration
  fieldPrograms: ProgramNamesDto[] = []; // Use ProgramNamesDto instead of ProgramCardDto
  fieldNames: string[] = [];
  @ViewChild('secondNavbar') secondNavbar!: ElementRef;
  @ViewChildren('circle') circlesRef!: QueryList<ElementRef>;

  private isNavbarVisible = false;

  constructor(
    private router: Router,
    private programCardService: ProgramCardService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.setPhotoHeight();
    this.setupScrollListener();
    this.loadFieldNames(); // Fetch all field names
  }

  // Fetch field names
// Fetch field names

// ეს არის წრეების დაკლიკვების ლოგიკები
// loadFieldNames(): void {
//   this.programCardService.getAllFieldNames().pipe(takeUntil(this.destroy$)).subscribe({
//     next: (fields: FieldDto[]) => {
//       // Assuming fields already match the FieldDto interface
//       this.fields = fields; // Directly assigning since it's already of type FieldDto[]
      
//       // Map the field names for use elsewhere
//       this.fieldNames = this.fields.map(field => field.fieldName);
//       this.createFieldProgramMapping(); // Create mapping after loading fields
//     },
//     error: (err) => {
//       console.error('Error fetching field names:', err);
//     }
//   });
// }

  // Fetch field programs based on loaded fields
// Fetch field programs based on loaded fields
// createFieldProgramMapping(): void {
//   this.fields.forEach((field) => {
//     this.programCardService.getFieldProgram(field.fieldName).pipe(takeUntil(this.destroy$)).subscribe({
//       next: (programs: ProgramNamesDto[]) => {
//         // Ensure fieldProgramMapping is initialized for the field
//         if (!this.fieldProgramMapping[field.fieldName]) {
//           this.fieldProgramMapping[field.fieldName] = [];
//         }

//         // Map the fetched programs to match the ProgramNamesDto structure
//         const mappedPrograms: ProgramNamesDto[] = programs.map((program: ProgramNamesDto) => ({
//           id: program.id !== undefined ? program.id : undefined, // Set id to undefined if it's null
//           programname: program.programname || '', // Use programname instead of programName
//           checkBoxes: program.checkBoxes || [], // Ensure checkBoxes is handled correctly
//           width: this.getButtonWidth(program.programname), // Adjust width calculation if necessary
//         }));

//         // Push the mapped programs to the fieldProgramMapping
//         this.fieldProgramMapping[field.fieldName].push(...mappedPrograms);
//       },
//       error: (err) => {
//         console.error('Error fetching field programs:', err);
//       }
//     });
//   });
// }


  // onCircleClick(index: number): void {
  //   this.activeCircleIndex = index;
  //   this.updateCurrentFieldAndPrograms(index);
  // }

loadFieldNames(): void {
  this.programCardService.getAllFieldNames().pipe(takeUntil(this.destroy$)).subscribe({
    next: (fields: FieldDto[]) => {
      this.fields = fields;
      this.createFieldProgramMapping(); // Preload all field programs
    },
    error: (err) => {
      console.error('Error fetching field names:', err);
    }
  });
}

createFieldProgramMapping(): void {
  this.fields.forEach((field) => {
    this.programCardService.getFieldProgram(field.fieldName).pipe(takeUntil(this.destroy$)).subscribe({
      next: (programs: ProgramNamesDto[]) => {
        this.fieldProgramMapping[field.fieldName] = programs.map(program => ({
          ...program,
          width: this.getButtonWidth(program.programname)
        }));
      },
      error: (err) => {
        console.error(`Error fetching programs for field ${field.fieldName}:`, err);
      }
    });
  });
}







  onAccordionClick(fieldName: string): void {
    this.currentProgramNames = this.fieldProgramMapping[fieldName] || [];
  }

  updateCurrentFieldAndPrograms(index: number): void {
    if (this.fields.length > index) {
      const selectedField = this.fields[index];
      this.currentFieldName = selectedField.fieldName || null;
  
      if (this.currentFieldName) {
        this.currentProgramNames = this.fieldProgramMapping[this.currentFieldName] || [];
     
      } else {
        this.currentProgramNames = [];
      }
      this.cdr.detectChanges();
    }
  }
  
  
  

  updateButtonWidths(): void {
    this.programCards.forEach((program: ProgramCardDto) => {
      program.fields?.forEach((field: FieldDto) => {
        field.programNames = field.programNames.map((program) => ({
          ...program,
          width: this.getButtonWidth(program.programname),
        }));
      });
    });
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateButtonWidths(); // Recalculate widths on window resize
  }

  getButtonWidth(programName: string): string {
    const isMobile = window.innerWidth < 500;
    return isMobile ? '280px' : (programName.length > 20 ? this.getRandomWidth(320, 450) : '240px');
  }

  getRandomWidth(min: number, max: number): string {
    const randomWidth = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${randomWidth}px`;
  }

  getPadding(card: { title: string }): string {
    return card.title.length < 20 ? '2px' : '10px';
  }

  onWindowScroll(): void {
    const scrolled = window.scrollY > 200;

    if (scrolled && !this.isNavbarVisible) {
      this.isNavbarVisible = true;
      this.slideDownNavbar();
      this.toggleNavbar('firstNavbarl');
    } else if (!scrolled && this.isNavbarVisible) {
      this.isNavbarVisible = false;
      this.slideUpNavbar();
      this.toggleNavbar('secondNavbar2');
    }
  }

  toggleNavbar(navbarId: string): void {
    const button = document.getElementById(navbarId);
    if (button) {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      if (isExpanded) button.click();
    }
  }

  setPhotoHeight(): void {
    const photoElement = document.querySelector('.photo-class') as HTMLElement;
    if (photoElement) {
      this.photoHeight = photoElement.offsetHeight;
    }
  }

  onCardClicked(cardTitle: string): void {
    this.router.navigate(['/Pupil/UniFaculty/', cardTitle]);
  }

  setupScrollListener(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.onWindowScroll();
        });
    });
  }

  slideDownNavbar(): void {
    gsap.to(this.secondNavbar.nativeElement, { y: 0, duration: 0.3, ease: 'power2.out' });
  }

  slideUpNavbar(): void {
    gsap.to(this.secondNavbar.nativeElement, { y: -100, duration: 0.3, ease: 'power2.in' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
