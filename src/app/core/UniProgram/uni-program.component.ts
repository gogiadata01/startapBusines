import { Component, OnInit,  } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {CreateFormService} from "../services/create-form.service";
import {IUniFacultyCard} from "../models/common.model";
import {Icard} from "../models/common.model";
import { Router } from '@angular/router';
import {  AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FooterForPupilComponent } from "../../pages/footer-for-pupil/footer-for-pupil.component";
import {ProgramCardService} from '../../program-card.service'
import {ProgramCardDto} from '../models/common.model'
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-uni-program',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FooterForPupilComponent],
  templateUrl: './uni-program.component.html',
  styleUrl: './uni-program.component.scss',
})
export class UniProgramComponent   {

//   cards:IUniFacultyCard[] = []
//   cards1:Icard[] = []
//   programCards:ProgramCardDto[] = []
//   getButtonWidth(Card: any): string {
//     // Function to generate a random width between 320px and 450px
//     function getRandomWidth(min: number, max: number): string {
//       const randomWidth = Math.floor(Math.random() * (max - min + 1)) + min;
//       return `${randomWidth}px`;
//     }
    
//     // Example logic to return different widths based on Card properties
//     if (Card.title.length > 20) {
//       return getRandomWidth(320, 450); // Random width between 320px and 450px
//     }
  
//     if (Card.someCondition) {
//       return '340px'; // Example fixed width
//     }
  
//     return '240px'; // Default width
//   }
  
//   getPadding(Card: any): string {
//     // Check the length of the title and return the appropriate padding
//     return Card.title.length < 20 ? '2px' : '10px';
//   }
  
  
//   data = [
//     {"title":"სტატისტიკა"},
//     {"title":" ციფრული სატელეკომუნიკაციო ტექნოლოგიები "},
//     {"title":" კომპიუტერული ინფორმაციული ტექნოლოგიები "},
//     {"title":"საინფორმაციო ტექნოლოგიები"},
//     {"title":" მონაცემთა მეცნიერება და ხელოვნური ინტელექტი "},
//     {"title":" ინფორმაციული ტექნოლოგიები(ინგლისურენოვანი) "},
//     {"title":"მათემატიკა (ინგლისურენოვანი)"},
//     {"title":" კომპიუტერული მეცნიერება"},
//     {"title":" კომპიუტერული მეცნიერება "},
//     {"title":"კომპიუტერული მეცნიერება"},
//     {"title":" კომპიუტერული მეცნიერება (ინგლისურენოვანი) "},
//     {"title":" კომპიუტერული მეცნიერება"}
// ]
//   constructor(private cardService: CreateFormService,private router: Router,private programCardService:ProgramCardService) {
    
//   }
//   ngOnInit(): void {
//     this.getHomeUniFacultyCard()
//     this.fetchProgramCards()
//   }

//   getHomeUniFacultyCard(){
//     this.cardService
//     .getAllUniFacultyCard()
//     .snapshotChanges()
//     .subscribe({
//       next:(data) => {
//         this.cards = [];
//         data.forEach((item) => {
//           let Card = item.payload.toJSON() as IUniFacultyCard
//           this.cards.push({
//             key: item.key|| "",
//             title:Card.title,
//             text:Card.text,
//             sections:Card.sections
//           })
//         })
//       }
//     })
//   }
//   fetchProgramCards(): void {
//     this.programCardService.getProgramCard().subscribe({
//       next:(program) => {
//         this.programCards = program;
//         console.log(program)
//       },
//       error: (err) => {
//         console.error('Error fetching program', err);
//       }
//     })
//   }
//   onCardClicked(cardkey:any,cardtitl:any) :void{
//     this.router.navigate(['/Pupil/UniFaculty/',cardkey,cardtitl])
//   }
//   @ViewChildren('circle') circlesRef!: QueryList<ElementRef>;

//   circles = [1, 2, 3, 4, 5, 6]; // Adjust the number of circles as needed
//   activeCircleIndex: number = 0; // By default, the first circle is green

//   // When a circle is clicked
//   onCircleClick(index: number): void {
//     this.activeCircleIndex = index; // Set the clicked circle as active
//   }
cards: IUniFacultyCard[] = [];
  programCards: ProgramCardDto[] = [];
  circles = [1, 2, 3, 4, 5, 6];
  activeCircleIndex: number = 0;

  constructor(
    private cardService: CreateFormService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private programCardService: ProgramCardService
  ) {}

  ngOnInit(): void {
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
  
  

  onCardClicked(cardkey: string, cardtitle: string): void {
    this.router.navigate(['/Pupil/UniFaculty/', cardkey, cardtitle]);
  }

  @ViewChildren('circle') circlesRef!: QueryList<ElementRef>;

  onCircleClick(index: number): void {
    this.activeCircleIndex = index;
  }

  getButtonWidth(programName: string): string {
    // Function to generate a random width between 320px and 450px
    function getRandomWidth(min: number, max: number): string {
      const randomWidth = Math.floor(Math.random() * (max - min + 1)) + min;
      return `${randomWidth}px`;
    }
  
    // Return different widths based on the length of programname
    if (programName.length > 20) {
      return getRandomWidth(320, 450); // Random width between 320px and 450px for long names
    }
  
    return '240px'; // Default width for shorter names
  }
  

  getPadding(Card: any): string {
    return Card.title.length < 20 ? '2px' : '10px';
  }

}
