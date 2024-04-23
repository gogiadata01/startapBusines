import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-formc',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './formc.component.html',
  styleUrl: './formc.component.scss'
})
export class FormcComponent {
  cardForm!: FormGroup
  constructor(  private fb:FormBuilder,private cardService: CreateFormService, private router :Router) {
    this.cardForm = this.fb.group({
      title : new FormControl("",Validators.required),
      text:new FormControl("",Validators.required),
      text2:new FormControl("",Validators.required),
    })
  }
  submit(){
    this.cardService.AddCard(this.cardForm.value);
    this.router.navigate(['/']);
  }
}
