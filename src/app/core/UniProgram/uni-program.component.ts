import {Component,HostListener,OnInit,OnDestroy,NgZone,ViewChild,ElementRef,ViewChildren, QueryList,} from '@angular/core';
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
import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { and } from 'firebase/firestore';

@Component({
  selector: 'app-uni-program',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule, NgIf, NgFor, FooterForPupilComponent, RouterLink],
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
  Search: FormGroup;
  filteredUniCards: any[] = []; // This will hold filtered results
  private isNavbarVisible = false;
  isSearchClicked = false; // Initially false

  constructor(private fb: FormBuilder,
    private router: Router,
    private programCardService: ProgramCardService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.Search = this.fb.group({
      title: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.setPhotoHeight();
    this.setupScrollListener();
    this.loadFieldNames(); // Fetch all field names
    this.onAccordionClick(this.fields[0]?.fieldName);

  }


  loadFieldNames(): void {
    this.programCardService.getAllFieldNames().subscribe(fields => {
      this.fields = fields;
      // Automatically load programs for the first field if available
      if (this.fields.length > 0) {
        this.onAccordionClick(this.fields[0].fieldName);
      }
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
      this.filteredUniCards = this.currentProgramNames; // Reset to default programs
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







onAccordionClick(fieldName: string): void {
  this.programCardService.getProgramsByField(fieldName).subscribe(programs => {
    this.currentProgramNames = programs;
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
