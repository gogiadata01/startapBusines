import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink, UrlHandlingStrategy} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
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

}
