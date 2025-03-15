import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { UserDto } from '../../core/models/common.model';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-with-api',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-with-api.component.html',
  styleUrls: ['./register-with-api.component.scss']
})
export class RegisterWithApiComponent implements OnInit {
  RegisterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.RegisterForm = this.fb.group({
      Name: ['', Validators.required],
      Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
        ]
      ],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')
        ]
      ],
      Type: ['', Validators.required],
      Img: [''],
      Coin: [0],
      Token: ['']
    });
  }    

  ngOnInit(): void {
    Swal.fire({
      title: 'გაფრთხილება',
      text: 'დარეგისტრირდი სწორი იმეილით,რადგან პრიზის მოგების შემთხვევაში დაგიკავშირდეთ.',
      icon: 'info',
      showConfirmButton: true
    });
  }

  onSubmit(): void {
    console.log('Submitting form...');
    console.log('Form Valid:', this.RegisterForm.valid);
    console.log('Form Values:', this.RegisterForm.value);

    if (this.RegisterForm.invalid) {
      Swal.fire({
        title: "შეცდომა",
        text: "გთხოვთ სწორად შეავსოთ ყველა ველი!",
        icon: "error"
      });
      return;
    }

    const userDto: UserDto = this.RegisterForm.value;
    this.userService.registerUser(userDto).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'შესრულდა',
          text: 'წარმატებით გაიარეთ რეგისტრაცია',
          icon: 'success',
          showConfirmButton: false,
          timer: 1800
        });

        setTimeout(() => {
          this.router.navigate(['/SignUp']);
        }, 1500);

        console.log('User added successfully', response);
      },
      error: (err) => {
        console.error('Error adding user', err);
        Swal.fire({
          title: 'შეცდომა',
          text: 'რეგისტრაციისას შეცდომა მოხდა, გთხოვთ სცადოთ თავიდან!',
          icon: 'error',
          showConfirmButton: true
        });
      }
    });
  }

  // Getters for form controls
  get Name() {
    return this.RegisterForm.get('Name');
  }
  get Email() {
    return this.RegisterForm.get('Email');
  }
  get Password() {
    return this.RegisterForm.get('Password');
  }
  get Type() {
    return this.RegisterForm.get('Type');
  }
}
