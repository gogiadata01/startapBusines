import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import {IUniFacultyCard} from '../../core/models/common.model'
import {Icard} from '../../core/models/common.model'
import { Router } from '@angular/router';
import {UniProgramComponent} from '../../core/UniProgram/uni-program.component'
import { FooterForPupilComponent } from "../../pages/footer-for-pupil/footer-for-pupil.component";
import { QuizeComponent } from '../quize/quize.component';
import { RouterLink} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {ProgramCardService} from '../../program-card.service'
import {ProgramCardDto} from '../../core/models/common.model'
import { HostListener } from '@angular/core';
import {EventCardService} from '../../event-card.service'
import {EventCardDto, } from "../../core/models/common.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterForPupilComponent, QuizeComponent, UniProgramComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cards: IUniFacultyCard[] = [];
  programCards: ProgramCardDto[] = [];
  circles = [0,1, 2, 3, 4, 5];
  activeCircleIndex: number = 0;
  EventCard:EventCardDto[] = []
  selectedField: string | null = null; // Track the selected field
  constructor(private router: Router,private cdr: ChangeDetectorRef,   private EventCardService: EventCardService  ,  private programCardService: ProgramCardService
    ) {
    
  }
  ngOnInit(): void {
    this.GetAllEventCard()
    this.getProgram(); // Fetch the program data when the component initializes
  }
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

  leaders1 = ['Person 1', 'Person 2', 'Person 3', 'Person 4'];
  leaders2 = ['Person 5', 'Person 6', 'Person 7', 'Person 8'];
  leaders3 = ['Person 9', 'Person 10', 'Person 11', 'Person 12'];
  onCircleClick(index: number): void {
    this.activeCircleIndex = index; // Update to show the field at this index
  }

  // Function to toggle selected field name
  togglePrograms(fieldName: string): void {
    if (this.selectedField === fieldName) {
      this.selectedField = null; // Deselect if already selected
    } else {
      this.selectedField = fieldName; // Select the new field
    }
  }

  // Function to check if the field should be shown
  isFieldSelected(fieldName: string): boolean {
    return this.selectedField === fieldName;
  }

  
containerStyle = {
    backgroundColor: 'rgba(93,115,126,0.9)',
    padding: '20px',
    borderRadius: '8px',
    width: '100%', // შეიტანეთ თქვენი საჭიროება
    maxWidth: '1200px', // მაქსიმალური სიგანე
    height: '350px',
    margin: '0 auto', // ცენტრში განლაგება
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
    };
    
    contentStyle = {
    display: 'flex', // აქ არის შეცვლილი
    justifyContent: 'space-between',
    gap: '20px', // სივრცე შორის
    flexWrap: 'wrap',
    width: '100%',
    };
    
    cardStyle = {
    backgroundColor: '#ced4da',
    height: '80px',

    };
  onCardClicked(cardkey:any,cardtitl:any) :void{
    this.router.navigate(['/Pupil/UniFaculty/',cardkey,cardtitl])
  }
  onCardClicked1(cardkey:any) :void{
    this.router.navigate(['/Pupil/Events/',cardkey])
  }
  @ViewChildren('circle') circlesRef!: QueryList<ElementRef>;



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
  GetAllEventCard() {
    this.EventCardService.getAllEventCard()
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

