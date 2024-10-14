  import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
  import { CommonModule ,NgFor } from '@angular/common';
  import { ElementRef, } from '@angular/core';
  import { Router } from '@angular/router';
  import { UniProgramComponent } from '../../core/UniProgram/uni-program.component'
  import { FooterForPupilComponent } from "../../pages/footer-for-pupil/footer-for-pupil.component";
  import { QuizeComponent } from '../quize/quize.component';
  import { ChangeDetectorRef } from '@angular/core';
  import {ProgramCardService} from '../../program-card.service'
  import {ProgramCardDto,FieldDto,ProgramNamesDto} from '../../core/models/common.model'
  import {EventCardService} from '../../event-card.service'
  import {EventCardDto, } from "../../core/models/common.model";
  import { RouterLink } from '@angular/router';
  import { NavbarComponent } from '../../navbar/navbar.component';
  import { Subject, fromEvent } from 'rxjs';
  import { takeUntil } from 'rxjs/operators';
  import { gsap } from 'gsap';
  import {  AfterViewInit,  ViewChildren, QueryList } from '@angular/core';
  import {AuthenticationService} from '../../authentication.service'
import { FormsModule } from '@angular/forms';
interface PodiumEntry {
  name: string;
  position: number;
  imageUrl: string;
}

interface LeaderboardEntry {
  position: number;
  name: string;
  imageUrl: string;
}




  @Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, FooterForPupilComponent, QuizeComponent, UniProgramComponent, RouterLink, NavbarComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
  export class HomeComponent implements OnInit, OnDestroy   {


    entries: LeaderboardEntry[] = [
      { position: 4, name: 'სახელი გვარი', imageUrl: 'https://res.klook.com/image/upload/c_fill,w_750,h_563/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig.jpg' }, 
      { position: 5, name: 'სახელი გვარი', imageUrl: 'https://res.klook.com/image/upload/c_fill,w_750,h_563/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig.jpg' }, 
      { position: 6, name: 'სახელი გვარი', imageUrl: 'https://res.klook.com/image/upload/c_fill,w_750,h_563/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig.jpg' }, 
    ];

    // title = 'ლიდერთა სია';
  podiumEntries: PodiumEntry[] = [
    { name: 'ბუტმუტი ბერი', position: 1, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgPbd2MBbw3o5_yzYC_pPjoVNKUx7WCrMN3g&s' },
    { name: 'ელენე მიქაბერიძე ', position: 2, imageUrl: 'https://res.klook.com/image/upload/c_fill,w_750,h_563/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig.jpg' },
    { name: 'მიცუბიშ ჩერიოტი', position: 3, imageUrl: 'https://res.klook.com/image/upload/c_fill,w_750,h_563/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig.jpg' },
  ];

    programCards: ProgramCardDto[] = [];
    circles: number[] = Array.from({ length: 6 }, (_, i) => i);
    activeCircleIndex: number = 0;
    fields: FieldDto[] = [];
    currentFieldName: string | null = null;
    currentProgramNames: ProgramNamesDto[] = [];
    fieldProgramMapping: { [key: string]: ProgramNamesDto[] } = {};    EventCard:EventCardDto[] = []
    selectedField: string | null = null; // Track the selected field
    fieldPrograms: ProgramNamesDto[] = []; // Use ProgramNamesDto instead of ProgramCardDto
    fieldNames: string[] = [];
    selectedSubjects: string[] = []; // Array to hold selected subjects
    matchingPrograms: any[] = []; // Ensures it's initialized to an empty array
    errorMessage: string | null = null; // Variable for error messages
  

    
    // Sample list of subjects; this should be populated based on your requirements
    subjects: string[] = [
      'ქართული', 'უცხო ენები', 'ქიმია', 'ფიზიკა', 
      'ბიოლოგია', 'მათემატიკა', 'სამოქალაქო განათლება', 
      'გეოგრაფია', 'მუსიკა', 'ხელოვნება', 'ისტორია', 'სპორტი'
    ];

    constructor(private router: Router,private cdr: ChangeDetectorRef, private authService:AuthenticationService,private ngZone: NgZone , private EventCardService: EventCardService  ,  private programCardService: ProgramCardService
      ) {
      }

      
    
      
    @Input() text: string = 'არჩიეთ თქვენთვის შესაფერისი პროგრამა';

      // Fetch field names
// Fetch field names

// ეს არის წრეების დაკლიკვების ლოგიკები
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

  // Fetch field programs based on loaded fields
// Fetch field programs based on loaded fields
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
      }
    });
  });
}


onCircleClick(index: number): void {
  this.activeCircleIndex = index;
  this.updateCurrentFieldAndPrograms(index);
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

    leaders1 = ['Person 1', 'Person 2', 'Person 3', 'Person 4'];
    leaders2 = ['Person 5', 'Person 6', 'Person 7', 'Person 8'];
    leaders3 = ['Person 9', 'Person 10', 'Person 11', 'Person 12'];
    
    onCardClicked( cardtitle: any): void {
      this.router.navigate(['/Pupil/UniFaculty/', cardtitle]);
    }
    // Function to toggle selected field name

    // Function to check if the field should be shown

    


    
    containerStyle = {
      backgroundColor: 'rgba(93,115,126,0.9)',
      padding: '20px',
      borderRadius: '8px',
      width: '100%', 
      maxWidth: '1200px', 
      height: '350px',
      margin: '0 auto', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

    };

    headerStyle = {
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: '20px',
      width: '100%',
    };

    buttonStyle = {
      backgroundColor: 'transparent',
      color: 'white',
      padding: '4px 3px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '10px',
      transition: 'background-color 0.3s',
      display: 'flex',
      marginRight: '10px',

    };

    activeButtonStyle = {
      ...this.buttonStyle,
      backgroundColor: '#ee964b',
    }

    contentStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '20px', 
      flexWrap: 'wrap',
      width: '100%',
    }

    cardStyle = {
      backgroundColor: '#ced4da',
      height: '80px',

    
  }
    @ViewChild('secondNavbar') secondNavbar!: ElementRef;
    private isNavbarVisible = false;
    private destroy$ = new Subject<void>();
    private photoHeight = 0;

    ngOnInit() {
      this.GetAllEventCard()
      this.loadFieldNames(); // Fetch all field names
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
      this.filterMatchingPrograms();  // Automatically filter programs on initialization

    }
    onSubjectChange(subject: string): void {
      const index = this.selectedSubjects.indexOf(subject);
      if (index > -1) {
        this.selectedSubjects.splice(index, 1); // Remove subject if it's already selected
      } else {
        this.selectedSubjects.push(subject); // Add subject if it's not selected
      }
    }
    
    markAllSubjects(event: any): void {
      if (event.target.checked) {
        this.selectedSubjects = [...this.subjects]; // Select all subjects
      } else {
        this.selectedSubjects = []; // Deselect all subjects
      }
    }
    
    filterMatchingPrograms() {
      if (this.selectedSubjects.length === 0) {
        this.errorMessage = "Please select at least one subject.";
        return;
      }
    
      console.log('Selected Subjects:', this.selectedSubjects);
    
      // Call the updated service method
      this.programCardService.getProgramCardDetailsBySubjects(this.selectedSubjects).subscribe({
        next: (programCards: ProgramCardDto[]) => {
          console.log('Returned Program Cards:', programCards);
    
          this.matchingPrograms = programCards; // Reset the array before adding new data
          console.log(this.matchingPrograms)
        },
        error: (err) => {
          console.error('Error fetching programs:', err);
          this.errorMessage = err.message;
        }
      });
    }
  
  
    
    onCardClicked1(cardkey:any) :void{
      this.router.navigate(['/Pupil/Events/',cardkey])
    }
    @ViewChildren('circle') circlesRef!: QueryList<ElementRef>;

    // @HostListener('window:scroll', [])

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


    // When a circle is clicked
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
    // @HostListener('window:resize', ['$event'])
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
    getPadding(Card: any): string {
      return Card.title.length < 20 ? '2px' : '10px';
    }
    GetAllEventCard() {
      this.EventCardService.getEventCardForHome()
        .subscribe({
          next: (Eventcard) => {
            // Filter the event cards to only include those where isFeatured is true
            this.EventCard = Eventcard.filter(event => event.isFeatured === true);
            
            console.log('Featured Event Cards:', this.EventCard); // Check if data is correctly coming
          },
          error: (err) => {
            console.error('Error fetching event data:', err);
          }
        });
    }
  }


    