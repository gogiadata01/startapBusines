import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators} from "@angular/forms";
import {NgIf,CommonModule} from "@angular/common";
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import {Router, RouterLink, UrlHandlingStrategy} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { reduce } from 'rxjs';
import { query } from 'firebase/firestore';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-home-faculty-card',
  standalone: true,
  imports: [    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './add-home-faculty-card.component.html',
  styleUrl: './add-home-faculty-card.component.scss'
})
export class AddHomeFacultyCardComponent implements OnInit {
  fb = inject(FormBuilder)
  Card:any = [];
  APIURL= "http://localhost:8000/"
  createform = inject(CreateFormService)
  router = inject(Router)
  Form = this.fb.nonNullable.group({
    title: ["",Validators.required] ,
    text :  ["",Validators.required],

  })
  Submit() : void {
    this.createform.AddHomeUniFacultyCard(this.Form.value as any)
  }
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.get_HomeUniCard();
    console.log(this.Card);
  }
  
  get_HomeUniCard() {
    this.http.get(this.APIURL + "get_HomeUniCard").subscribe((res) => {
      this.Card = res;
    });
  }
}
