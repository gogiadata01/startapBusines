import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule,
  NgIf, RouterLink,],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router)
  errormassage: string| null = null 

  Form = this.fb.nonNullable.group({
    email: ['' , Validators.required],
    Password: ['', Validators.required]
  }) 
  Submit() : void {
    const rawForm = this.Form.getRawValue();
    this.authService.login(rawForm.email,rawForm.Password).subscribe({
      next: ()=>{
        this.router.navigateByUrl('/Home')
      },
      error: (err) => {
        this.errormassage = err.code;
      }
    })
  }
}
