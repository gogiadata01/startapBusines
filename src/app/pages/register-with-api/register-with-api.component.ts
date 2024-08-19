import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { UserDto } from '../../core/models/common.model';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register-with-api',
  standalone: true,
  imports: [    
    NgFor,
    NgIf,
    ReactiveFormsModule],
  templateUrl: './register-with-api.component.html',
  styleUrl: './register-with-api.component.scss'
})
export class RegisterWithApiComponent {
  RegisterForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private UserService : UserService
  ){
    this.RegisterForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      Type: [''],
      Img: [''],
    })

  }
  onSubmit(): void {
    if (this.RegisterForm.valid) {
      const UserDto:UserDto  = this.RegisterForm.value;
      this.UserService.registerUser(UserDto).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
        },
        error: (err) => {
          console.error('Error adding UniCard', err);
        }
      })
      console.log(this.RegisterForm.value);
    }
  }
}
