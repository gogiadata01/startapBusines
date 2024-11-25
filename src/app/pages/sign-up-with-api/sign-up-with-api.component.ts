import { Component ,OnInit} from '@angular/core';
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
import { CookieService } from 'ngx-cookie-service'; // import the cookie service

@Component({
  selector: 'app-sign-up-with-api',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule
  ,RouterLink,],
  templateUrl: './sign-up-with-api.component.html',
  styleUrl: './sign-up-with-api.component.scss'
})
export class SignUpWithApiComponent  {
  SignIn: FormGroup;
  constructor(
    private fb: FormBuilder,
    private UserService : UserService,
    private router: Router,
    private authService:AuthenticationService,
    private cookieService: CookieService
  ){
    this.SignIn = this.fb.group({
      Email: ['',],
      Password: ['',]  
    })
  }

  onSubmit(): void {
    if (this.SignIn.valid) {
      const UserSignInDto: UserSignInDto = this.SignIn.value;
      this.UserService.signInUser(UserSignInDto).subscribe({
        next: (response) => {
          const user: UserDto = {
            id: response.userId,
            name: response.userName,
            email: response.email,
            Password: response.password,
            type: response.type, // Adjust according to your API response
            img: response.img,
            coin: response.coin,
            Token: response.token // Make sure this is a valid JWT token
          };
  
  
          // Save the user information in the AuthenticationService
          this.authService.setToken(user.Token);
  
          Swal.fire({
            title: "შესრულდა",
            text: "წარმატებით გაიარეთ ავტორიზაცია",
            icon: "success",
            showConfirmButton: false,
            timer: 1800
          });
  
          setTimeout(() => {
            this.router.navigate(['Home']);
          }, 1500);
        },
        error: (err) => {
          Swal.fire({
            title: "შეცდომა",
            text: "მეილი და პაროლი არასწორია",
            icon: "info"
          });
        }
      });
    }
  }
  

}


