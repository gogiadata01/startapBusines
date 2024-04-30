import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    NgIf,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  Form = this.fb.nonNullable.group({
    username :  ["",Validators.required] ,
    email :  ["",Validators.required],
    password:  ["",Validators.required]
  })
  Submit() : void {
    const rawForm = this.Form.getRawValue();
    this.authService.register(rawForm.email,rawForm.username,rawForm.password).subscribe(() =>{
      this.router.navigateByUrl('/')
    })
  }
}
