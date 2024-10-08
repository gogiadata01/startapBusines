import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder,FormArray, FormGroup, ReactiveFormsModule, FormsModule,Validators } from '@angular/forms';
import { CommonModule,NgIf } from '@angular/common';
// import { CreateFormService } from "../../core/services/create-form.service";
import {Router, RouterLink, UrlHandlingStrategy} from "@angular/router";

@Component({
  selector: 'app-stupid-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './stupid-user.component.html',
  styleUrls: ['./stupid-user.component.scss']
})
export class StupidUserComponent  {
  // fb = inject(FormBuilder);
  // createFormService = inject(CreateFormService);
  // allCards: IUniFacultyCard[] = [];
  // filteredTitles: string[] = [];

  // form = this.fb.group({
  //   ქიმია: false,
  //   მათემატიკა: false,
  //   ფიზიკა: false,
  //   ინგლისური: false,
  //   ბიოლოგია:false
  // });

  // ngOnInit() {
  //   this.fetchAllUniFacultyCards();
  // }

  // fetchAllUniFacultyCards() {
  //   this.createFormService.getAllUniFacultyCard().snapshotChanges().subscribe(data => {
  //     this.allCards = data.map(e => {
  //       const cardData = e.payload.val() as IUniFacultyCard;
  //       return { ...cardData, key: e.key ?? undefined };
  //     });
  //   });
  // }

  // submit(): void {
  //   const selectedSubjects = Object.keys(this.form.value)
  //     .filter(key => this.form.get(key)?.value) as (keyof typeof this.form.value)[];
  
  //   const filteredTitles = this.allCards
  //     .filter(card => 
  //       card.sections && card.sections.some(section => 
  //         section.checkBoxNames && section.checkBoxNames.some(cb => 
  //           selectedSubjects.includes(cb.checkBoxName as keyof typeof this.form.value))))
  //     .map(card => card.title);
  
  //   this.filteredTitles = filteredTitles;
  // }

  // fb = inject(FormBuilder);
  // createFormService = inject(CreateFormService);
  // allCards: IUniFacultyCard[] = [];
  // filteredTitles: string[] = [];

  // form = this.fb.group({
  //   ქიმია: false,
  //   მათემატიკა: false,
  //   ფიზიკა: false,
  //   ინგლისური: false,
  //   ბიოლოგია:false
  // });

  // ngOnInit() {
  //   this.fetchAllUniFacultyCards();
  // }

  // fetchAllUniFacultyCards() {
  //   this.createFormService.getAllUniFacultyCard().snapshotChanges().subscribe(data => {
  //     this.allCards = data.map(e => {
  //       const cardData = e.payload.val() as IUniFacultyCard;
  //       return { ...cardData, key: e.key ?? undefined };
  //     });
  //   });
  // }

  // submit(): void {
  //   console.log('All Cards:', this.allCards);

  //   // Retrieve the selected subjects (keys where the value is true)
  //   const selectedSubjects = Object.keys(this.form.value)
  //     .filter(key => this.form.get(key)?.value) as (keyof typeof this.form.value)[];
  
  //   // Debugging: Log the selected subjects
  //   console.log('Selected Subjects:', selectedSubjects);
  
  //   // Filter allCards to find cards that have matching sections
  //   const filteredTitles = this.allCards
  //     .filter(card => {
  //       // Check if any section in the card has a checkbox name that matches a selected subject
  //       const matches = card.sections?.some(section => 
  //         section.checkBoxNames?.some(cb => 
  //           selectedSubjects.includes(cb.checkBoxName as keyof typeof this.form.value)
  //         )
  //       );
  //       // Debugging: Log the card title and whether it matches
  //       console.log(`Card: ${card.title}, Matches: ${matches}`);
  //       return matches;
  //     })
  //     .map(card => card.title);
  
  //   // Debugging: Log the filtered titles
  //   console.log('Filtered Titles:', filteredTitles);
  
  //   // Assign the filtered titles to the component's property
  //   this.filteredTitles = filteredTitles;
  // }
  
  
}