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
  // fb = inject(FormBuilder)
  // createform = inject(CreateFormService)
  // router = inject(Router)
  // Form = this.fb.nonNullable.group({
  //   title: ["",Validators.required] ,
  //   text :  ["",Validators.required],
  //   ChackBoxNames: this.fb.array([this.createChackBoxNames()]),

  // })

  // createChackBoxNames(): FormGroup {
  //   return this.fb.group({
  //     ChackBoxName: ['', Validators.required],
  //   });
  // }
  
  // get ChackBoxNames(): FormArray {
  //   return this.Form.get('ChackBoxNames') as FormArray;
  // }
  
  // addChackBoxName(): void {
  //   this.ChackBoxNames.push(this.createChackBoxNames());
  // }


  // removeChackBoxName(index: number): void {
  //   this.ChackBoxNames.removeAt(index);
  // }
  // Submit() : void {
  //   this.createform.AddUniFacultyCard(this.Form.value as any)
  // }
  fb = inject(FormBuilder);
  createFormService = inject(CreateFormService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    title: ["", Validators.required],
    text: ["", Validators.required],
    checkBoxNames: this.fb.array([this.createCheckBoxNames()]),
  });

  createCheckBoxNames(): FormGroup {
    return this.fb.group({
      checkBoxName: ['', Validators.required],
    });
  }

  get checkBoxNames(): FormArray {
    return this.form.get('checkBoxNames') as FormArray;
  }

  addCheckBoxName(): void {
    this.checkBoxNames.push(this.createCheckBoxNames());
  }

  removeCheckBoxName(index: number): void {
    this.checkBoxNames.removeAt(index);
  }

  submit(): void {
    this.createFormService.AddUniFacultyCard(this.form.value as any);
  }
}