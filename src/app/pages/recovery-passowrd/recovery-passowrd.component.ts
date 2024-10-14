import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { UserSignInDto } from '../../core/models/common.model';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../authentication.service'
import {UserDto} from '../../core/models/common.model'
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recovery-passowrd',
  standalone: true,
  imports: [ NgFor,
    NgIf,
    ReactiveFormsModule
  ,RouterLink],
  templateUrl: './recovery-passowrd.component.html',
  styleUrl: './recovery-passowrd.component.scss'
})
export class RecoveryPassowrdComponent {
  RecoveryPassword: FormGroup;
  constructor(
    private fb: FormBuilder,
    private UserService : UserService,
    private router: Router,
    private authService:AuthenticationService
  ){
    this.RecoveryPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }


  onSubmit(): void {
    if (this.RecoveryPassword.valid) {
      const formValues = this.RecoveryPassword.getRawValue();  // Extract form values
      this.UserService.recoverPassword(formValues.email, formValues.newPassword).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Success',
            text: 'Password updated successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1800
          });
          setTimeout(() => {
            this.router.navigate(['SignUp']);
          }, 1500);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Failed to recover password',
            icon: 'error'
          });
        }
      });
    }
  }
  
}