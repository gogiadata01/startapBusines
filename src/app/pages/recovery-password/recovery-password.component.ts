import { Component,inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [ReactiveFormsModule,
    NgIf, RouterLink,],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export class RecoveryPasswordComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router)
  errormassage: string| null = null 

  Form = this.fb.nonNullable.group({
    email: ['' , Validators.required],
  }) 
  Submit(){
    const rawForm = this.Form.getRawValue();
    this.authService.ResetPassword(rawForm.email).subscribe({
      next: ()=>{
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        this.errormassage = err.code;
      }
    })
  }
}
