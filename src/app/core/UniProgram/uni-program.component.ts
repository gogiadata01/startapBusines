import {Component,HostListener,OnInit,OnDestroy,NgZone,ViewChild,ElementRef,ViewChildren, QueryList,} from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FooterForPupilComponent } from '../../pages/footer-for-pupil/footer-for-pupil.component';
import { ProgramCardService } from '../../program-card.service';
import { ProgramCardDto, FieldDto, ProgramNamesDto, ProgramCardEnDto, FieldEnDto,ProgramNamesEnDto } from '../models/common.model';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { and } from 'firebase/firestore';
import { NavbarWithWaveComponent } from "../../pages/navbar-with-wave/navbar-with-wave.component";
import {ProgramCardEnService} from "../../program-card-en.service"
@Component({
  selector: 'app-uni-program',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgIf, NgFor, FooterForPupilComponent, RouterLink, NavbarWithWaveComponent],
  templateUrl: './uni-program.component.html',
  styleUrls: ['./uni-program.component.scss'],
})
export class UniProgramComponent implements OnInit, OnDestroy {
  circles: number[] = Array.from({ length: 16 }, (_, i) => i);
  activeCircleIndex = 0;
  fields: FieldDto[] = [];
  fieldsEn : FieldEnDto[]=[]
  currentFieldName: string | null = null;
  currentFieldenName: string | null = null;
  currentProgramNames: ProgramNamesDto[] = [];
  currentProgramenNames: ProgramNamesEnDto[] = [];
  fieldProgramMapping: { [key: string]: ProgramNamesDto[] } = {};
  fieldProgramenMapping: { [key: string]: ProgramNamesEnDto[] } = {};
  private destroy$ = new Subject<void>();
  private photoHeight: number = 0; // Ensure it's declared properly
  programCards: ProgramCardDto[] = []; 
  programenCards: ProgramCardEnDto[] = []; 
  fieldPrograms: ProgramNamesDto[] = []; // Use ProgramNamesDto instead of ProgramCardDto
  fieldenPrograms: ProgramNamesEnDto[] = []; // Use ProgramNamesDto instead of ProgramCardDto
  fieldNames: string[] = [];
  fieldenNames: string[] = [];
  @ViewChild('secondNavbar') secondNavbar!: ElementRef;
  @ViewChildren('circle') circlesRef!: QueryList<ElementRef>;
  Search: FormGroup;
  filteredUniCards: any[] = []; // This will hold filtered results
  filteredUnienCards: any[] = []; // This will hold filtered results
  private isNavbarVisible = false;
  isSearchClicked = false; // Initially false
  language: 'ka' | 'en' = 'ka';

  constructor(private fb: FormBuilder,
    private router: Router,
    private programCardService: ProgramCardService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private ProgramCardEngService: ProgramCardEnService
  ) {
    this.Search = this.fb.group({
      title: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.language = (localStorage.getItem('language') as 'ka' | 'en') || 'ka';
    this.setPhotoHeight();
    this.setupScrollListener();
    this.loadFieldNames(); // Fetch all field names
    this.loadFieldEnNames();
    // this.onAccordionClick(this.fields[0]?.fieldName);
    this.currentProgramenNames
  }


  loadFieldNames(): void {
    this.programCardService.getAllFieldNames().subscribe(fields => {
      this.fields = fields;
      // Automatically load programs for the first field if available
      if (this.fields.length > 0) {
        this.onAccordionClick(this.fields[0].fieldName);
      }
      this.createFieldProgramMapping(); // ✅ call here
    });
  }
  loadFieldEnNames(): void {
    this.ProgramCardEngService.getAllFieldNames().subscribe(fields => {
      this.fieldsEn = fields;
      // Automatically load programs for the first field if available
      if (this.fieldsEn.length > 0) {
        this.onAccordionEnClick(this.fieldsEn[0].fieldName_en);
      }
      this.createFieldProgramEnMapping(); // ✅ call here
      console.log(this.fieldsEn)
    });
  }
  onSearch() {
    const searchTitle = this.Search.get('title')?.value?.trim(); // Get search input
  
    if (searchTitle) {
      this.programCardService.getProgramCardWithProgramName(searchTitle).subscribe({
        next: (filteredData: ProgramCardDto[]) => {
          // Assuming filteredData is an array of ProgramCardDto
          this.filteredUniCards =  filteredData
          console.log(this.filteredUniCards)
          this.isSearchClicked = true
        },
        error: (err) => {
          this.filteredUniCards  = []
        }
      });
    } else {
      // Reset to show all UniCards if search is cleared
      this.filteredUniCards = this.currentProgramNames;
      this.isSearchClicked = false; // Reset the search state
    }
  }
  onSearchEn() {
    const searchTitle = this.Search.get('title')?.value?.trim(); // Get search input
  
    if (searchTitle) {
      this.ProgramCardEngService.getProgramCardWithProgramName(searchTitle).subscribe({
        next: (filteredData: ProgramCardEnDto[]) => {
          // Assuming filteredData is an array of ProgramCardDto
          this.filteredUnienCards =  filteredData
          console.log(this.filteredUnienCards)
          this.isSearchClicked = true
        },
        error: (err) => {
          this.filteredUnienCards  = []
        }
      });
    } else {
      // Reset to show all UniCards if search is cleared
      this.filteredUnienCards = this.currentProgramenNames;
      this.isSearchClicked = false; // Reset the search state
    }
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
createFieldProgramEnMapping(): void {
  this.fieldsEn.forEach((field) => {
    this.ProgramCardEngService.getFieldProgram(field.fieldName_en).pipe(takeUntil(this.destroy$)).subscribe({
      next: (programs: ProgramNamesEnDto[]) => {
        this.fieldProgramenMapping[field.fieldName_en] = programs.map(program => ({
          ...program,
          width: this.getButtonWidth(program.programName_en)
        }));
      },
      error: (err) => {
        console.error(`Error fetching programs for field ${field.fieldName_en}:`, err);
      }
    });
  });
}
onAccordionClick(fieldName: string): void {
  this.programCardService.getProgramsByField(fieldName).subscribe(programs => {
    this.currentProgramNames = programs;
  });
}
onAccordionEnClick(fieldName: string): void {
  this.ProgramCardEngService.getProgramsByField(fieldName).subscribe(programs => {
    this.currentProgramenNames =programs ;
  });
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
  
  updateCurrentFieldEnAndPrograms(index: number): void {
    if (this.fieldsEn.length > index) {
      const selectedField = this.fieldsEn[index];
      this.currentFieldenName = selectedField.fieldName_en || null;
  
      if (this.currentFieldenName) {
        this.currentProgramenNames = this.fieldProgramenMapping[this.currentFieldenName] || [];
     
      } else {
        this.currentProgramenNames = [];
      }
      this.cdr.detectChanges();
    }
  }
  
  switchLanguage(lang: 'ka' | 'en'): void {
    this.language = lang;
    localStorage.setItem('language', lang);
  
    if (lang === 'ka') {
      this.loadFieldNames();
    } else {
      this.loadFieldEnNames();
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
  updateButtonEnWidths(): void {
    this.programenCards.forEach((program: ProgramCardEnDto) => {
      program.fields_en?.forEach((field: FieldEnDto) => {
        field.programNames_en = field.programNames_en.map((program) => ({
          ...program,
          width: this.getButtonWidth(program.programName_en),
        }));
      });
    });
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateButtonWidths(); // Recalculate widths on window resize
  }
  @HostListener('window:resize', ['$event'])
  onResizeEn(): void {
    this.updateButtonEnWidths(); // Recalculate widths on window resize
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
// }
// import {
//   Component,
//   OnInit,
//   OnDestroy,
//   HostListener,
//   ViewChild,
//   ElementRef,
//   ViewChildren,
//   QueryList,
//   NgZone,
//   ChangeDetectorRef
// } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule,
//   FormsModule
// } from '@angular/forms';
// import { CommonModule, NgFor, NgIf } from '@angular/common';
// import { Router, RouterLink } from '@angular/router';
// import { Subject, fromEvent } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { gsap } from 'gsap';

// import {
//   FieldDto,
//   FieldEnDto,
//   ProgramCardDto,
//   ProgramCardEnDto,
//   ProgramNamesDto,
//   ProgramNamesEnDto
// } from '../models/common.model';
// import { FooterForPupilComponent } from '../../pages/footer-for-pupil/footer-for-pupil.component';
// import { NavbarWithWaveComponent } from '../../pages/navbar-with-wave/navbar-with-wave.component';
// import { ProgramCardService } from '../../program-card.service';
// import { ProgramCardEnService } from '../../program-card-en.service';

// @Component({
//   selector: 'app-uni-program',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     FormsModule,
//     NgIf,
//     NgFor,
//     RouterLink,
//     FooterForPupilComponent,
//     NavbarWithWaveComponent
//   ],
//   templateUrl: './uni-program.component.html',
//   styleUrls: ['./uni-program.component.scss']
// })
// export class UniProgramComponent implements OnInit, OnDestroy {
//   fields: FieldDto[] = [];
//   fieldsEn: FieldEnDto[] = [];
//   currentProgramNames: ProgramNamesDto[] = [];
//   currentProgramenNames: ProgramNamesEnDto[] = [];
//   Search: FormGroup;
//   language: 'ka' | 'en' = 'ka';
//   isSearchClicked = false;
//   filteredUniCards: ProgramCardDto[] = [];
//   filteredUnienCards: ProgramCardEnDto[] = [];
//   private destroy$ = new Subject<void>();
//   @ViewChild('secondNavbar') secondNavbar!: ElementRef;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private programCardService: ProgramCardService,
//     private ProgramCardEngService: ProgramCardEnService,
//     private cdr: ChangeDetectorRef,
//     private ngZone: NgZone
//   ) {
//     this.Search = this.fb.group({
//       title: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     const storedLang = localStorage.getItem('language') as 'ka' | 'en';
//     this.language = storedLang || 'ka';
//     this.switchLanguage(this.language);
//     this.setupScrollListener();
//   }

//   switchLanguage(lang: 'ka' | 'en'): void {
//     this.language = lang;
//     localStorage.setItem('language', lang);
//     this.isSearchClicked = false;
//     this.Search.reset();

//     if (lang === 'ka') {
//       this.programCardService.getAllFieldNames().subscribe((fields) => {
//         this.fields = fields;
//         if (fields.length) this.onAccordionClick(fields[0].fieldName);
//       });
//     } else {
//       this.ProgramCardEngService.getAllFieldNames().subscribe((fields) => {
//         this.fieldsEn = fields;
//         if (fields.length) this.onAccordionEnClick(fields[0].fieldName_en);
//       });
//     }
//   }

//   onAccordionClick(fieldName: string): void {
//     this.programCardService.getProgramsByField(fieldName).subscribe((programs) => {
//       this.currentProgramNames = programs.map((p) => ({
//         ...p,
//         width: this.getButtonWidth(p.programname)
//       }));
//     });
//   }

//   onAccordionEnClick(fieldName: string): void {
//     this.ProgramCardEngService.getProgramsByField(fieldName).subscribe((programs) => {
//       this.currentProgramenNames = programs.map((p) => ({
//         ...p,
//         width: this.getButtonWidth(p.programName_en)
//       }));
//     });
//   }

//   // onSearch(): void {
//   //   const searchTitle = this.Search.get('title')?.value?.trim();
//     // if (!searchTitle) {
//     //   this.isSearchClicked = false;
//     //   return;
//     // }

//     // this.isSearchClicked = true;
//   //   if (this.language === 'ka') {
//   //     this.programCardService.getProgramCardWithProgramName(searchTitle).subscribe({
//   //       next: (data) => (this.filteredUniCards = data.map((p) => ({ ...p, width: this.getButtonWidth(p.programName) }))),
//   //       error: () => (this.filteredUniCards = [])
//   //     });
//   //   } else {
//   //     this.ProgramCardEngService.getProgramCardWithProgramName(searchTitle).subscribe({
//   //       next: (data) => (this.filteredUnienCards = data.map((p) => ({ ...p, width: this.getButtonWidth(p.programName_en) }))),
//   //       error: () => (this.filteredUnienCards = [])
//   //     });
//   //   }
//   // }
//     onSearch() {
//     const searchTitle = this.Search.get('title')?.value?.trim(); // Get search input
//     if (!searchTitle) {
//       this.isSearchClicked = false;
//       return;
//     }
//         this.isSearchClicked = true;

//     if (this.language === "ka") {
//       this.programCardService.getProgramCardWithProgramName(searchTitle).subscribe({
//         next: (filteredData: ProgramCardDto[]) => {
//           // Assuming filteredData is an array of ProgramCardDto
//           this.filteredUniCards =  filteredData
//           console.log(this.filteredUniCards)
//           this.isSearchClicked = true
//         },
//         error: (err) => {
//           this.filteredUniCards  = []
//         }
//       });
//     } else {
//       this.ProgramCardEngService.getProgramCardWithProgramName(searchTitle).subscribe({
//         next: (filteredData: ProgramCardEnDto[]) => {
//           // Assuming filteredData is an array of ProgramCardDto
//           this.filteredUnienCards =  filteredData
//           console.log(this.filteredUnienCards)
//           this.isSearchClicked = true
//         },
//         error: (err) => {
//           this.filteredUnienCards  = []
//         }
//       });
//     }
//   }

//   getButtonWidth(programName: string): string {
//     const isMobile = window.innerWidth < 500;
//     return isMobile ? '280px' : programName.length > 20 ? this.getRandomWidth(320, 450) : '240px';
//   }

//   getRandomWidth(min: number, max: number): string {
//     return `${Math.floor(Math.random() * (max - min + 1)) + min}px`;
//   }

//   onCardClicked(programTitle: string): void {
//     this.router.navigate(['/Pupil/UniFaculty/', programTitle]);
//   }

//   setupScrollListener(): void {
//     this.ngZone.runOutsideAngular(() => {
//       fromEvent(window, 'scroll')
//         .pipe(takeUntil(this.destroy$))
//         .subscribe(() => this.onWindowScroll());
//     });
//   }

//   onWindowScroll(): void {
//     const scrolled = window.scrollY > 200;
//     if (this.secondNavbar) {
//       gsap.to(this.secondNavbar.nativeElement, {
//         y: scrolled ? 0 : -100,
//         duration: 0.3,
//         ease: scrolled ? 'power2.out' : 'power2.in'
//       });
//     }
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }
// }
