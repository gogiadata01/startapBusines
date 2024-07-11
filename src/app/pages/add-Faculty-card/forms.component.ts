import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl,FormArray, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf,CommonModule} from "@angular/common";
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import {Router, RouterLink, UrlHandlingStrategy} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { reduce } from 'rxjs';
import { query } from 'firebase/firestore';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  fb = inject(FormBuilder);
  createFormService = inject(CreateFormService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    title: ["", Validators.required],
    text: ["", Validators.required],
    sections: this.fb.array([this.createSection()]),
    // checkBoxNames: this.fb.array([this.createCheckBoxNames()]),
  });

  createSection(): FormGroup {
    return this.fb.group({
      checkBoxNames: this.fb.array([this.createCheckBoxNames()]),
      // SavaldebuloSagnebi: this.fb.array([this.createSavaldebuloSagani()]),
      // ArchevitiSavaldebuloSagnebi: this.fb.array([this.createArchevitiSavaldebuloSagani()])

    });
  }
  get sections(): FormArray {
    return this.form.get('sections') as FormArray;
  }
  addSection(): void {
    this.sections.push(this.createSection());
  }
  removeSection(index: number): void {
    this.sections.removeAt(index);
  }
  createCheckBoxNames(): FormGroup {
    return this.fb.group({
      checkBoxName: ['', Validators.required],
    });
  }

  // get checkBoxNames(): FormArray {
  //   return this.form.get('checkBoxNames') as FormArray;
  // }

  addCheckBoxName(sectionIndex: number): void {
    const checkBoxNames = this.sections.at(sectionIndex).get('checkBoxNames') as FormArray;
    checkBoxNames.push(this.createCheckBoxNames());  }

  removeCheckBoxName(sectionIndex: number, checkBoxNameIndex: number): void {
    const checkBoxNames = this.sections.at(sectionIndex).get('checkBoxNames') as FormArray;
    checkBoxNames.removeAt(checkBoxNameIndex);  }

  submit(): void {
    this.createFormService.AddUniFacultyCard(this.form.value as any);
  }
}