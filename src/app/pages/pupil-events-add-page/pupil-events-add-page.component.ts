import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import {Router, RouterLink, UrlHandlingStrategy} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { reduce } from 'rxjs';
import { query } from 'firebase/firestore';

@Component({
  selector: 'app-pupil-events-add-page',
  standalone: true,
  imports: [NgIf,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent],
  templateUrl: './pupil-events-add-page.component.html',
  styleUrl: './pupil-events-add-page.component.scss'
})
export class PupilEventsAddPageComponent {
  fb = inject(FormBuilder)
  createform = inject(CreateFormService)
  router = inject(Router)
  Form = this.fb.nonNullable.group({
    url: ["",Validators.required] ,
    title :  ["",Validators.required],
    text :  ["",Validators.required],
  })
  Submit():void{
    this.createform.AddEventCard(this.Form.value as any)
  }
}
