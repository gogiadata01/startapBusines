import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule,
  NgIf],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  fb = inject(FormBuilder);
  Form = this.fb.nonNullable.group({
    email : new FormControl("", [Validators.required] ),
    Password: new FormControl("" , [Validators.required])
  })
}
