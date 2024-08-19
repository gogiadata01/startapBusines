import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { UserSignInDto } from '../../core/models/common.model';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up-with-api',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule],
  templateUrl: './sign-up-with-api.component.html',
  styleUrl: './sign-up-with-api.component.scss'
})
export class SignUpWithApiComponent {
  SignIn: FormGroup;
  constructor(
    private fb: FormBuilder,
    private UserService : UserService
  ){
    this.SignIn = this.fb.group({
      Email: ['',],
      Password: ['',]  
    })
  }
  onSubmit(): void {
    if (this.SignIn.valid) {
      const UserSignInDto:UserSignInDto  = this.SignIn.value;
      this.UserService.signInUser(UserSignInDto).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
        },
        error: (err) => {
          console.error('Error adding UniCard', err);
        }
      })
      console.log(this.SignIn.value);
    }
  }
}
