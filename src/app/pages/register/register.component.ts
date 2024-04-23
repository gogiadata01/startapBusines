import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  Form = this.fb.nonNullable.group({
    UserName :  ["",Validators.required] ,
    email :  ["",Validators.required],
    Password:  ["",Validators.required]
  })
  Submit() : void {
    const rawForm = this.Form.getRawValue();
    this.authService.register(rawForm.email,rawForm.UserName,rawForm.Password).subscribe(() =>{
      this.router.navigateByUrl('/')
    })
  }
}
