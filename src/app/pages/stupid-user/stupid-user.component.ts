import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder,FormArray, FormGroup, ReactiveFormsModule, FormsModule,Validators } from '@angular/forms';
import { CommonModule,NgIf } from '@angular/common';
import { CreateFormService } from "../../core/services/create-form.service";
import { IUniFacultyCard } from "../../core/models/common.model";
import {Router, RouterLink, UrlHandlingStrategy} from "@angular/router";

@Component({
  selector: 'app-stupid-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './stupid-user.component.html',
  styleUrls: ['./stupid-user.component.scss']
})
export class StupidUserComponent implements OnInit {
  fb = inject(FormBuilder);
  createFormService = inject(CreateFormService);
  allCards: IUniFacultyCard[] = [];
  filteredTitles: string[] = [];

  form = this.fb.group({
    ქიმია: false,
    მათემატიკა: false,
    ფიზიკა: false,
    ინგლისური: false,
    ბიოლოგია:false
  });

  ngOnInit() {
    this.fetchAllUniFacultyCards();
  }

  fetchAllUniFacultyCards() {
    this.createFormService.getAllUniFacultyCard().snapshotChanges().subscribe(data => {
      this.allCards = data.map(e => {
        const cardData = e.payload.val() as IUniFacultyCard;
        return { ...cardData, key: e.key ?? undefined };
      });
    });
  }

  submit(): void {
    const selectedSubjects = Object.keys(this.form.value)
      .filter(key => this.form.get(key)?.value) as (keyof typeof this.form.value)[];
  
    const filteredTitles = this.allCards
      .filter(card => 
        card.sections && card.sections.some(section => 
          section.checkBoxNames && section.checkBoxNames.some(cb => 
            selectedSubjects.includes(cb.checkBoxName as keyof typeof this.form.value))))
      .map(card => card.title);
  
    this.filteredTitles = filteredTitles;
  }
}