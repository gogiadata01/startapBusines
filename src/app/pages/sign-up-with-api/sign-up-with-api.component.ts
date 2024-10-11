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

@Component({
  selector: 'app-sign-up-with-api',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule
  ,RouterLink],
  templateUrl: './sign-up-with-api.component.html',
  styleUrl: './sign-up-with-api.component.scss'
})
export class SignUpWithApiComponent  {
  SignIn: FormGroup;
  constructor(
    private fb: FormBuilder,
    private UserService : UserService,
    private router: Router,
    private authService:AuthenticationService
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
          const user: UserDto = {
            Name: response.userName,
            Email: response.email,
            Password: response.password,
            type: response.type, // Adjust according to your API response
            Img: response.img,
            Coin:response.coin,
            ResetToken:response.resettoken
          };
      
          // Save the user information in the AuthenticationService
          this.authService.setCurrentUser(user);
          const userId = response.userId; // Adjust this according to your API response
          Swal.fire({
            title: "შესრულდა",
            text: "წარმატებით გაიარეთ ავტორიზაცია",
            icon: "success",
            showConfirmButton: false,
            timer: 1800
          });
          // Use navigate with parameters after successful sign-in
          setTimeout(()=>{
            this.router.navigate(['Home',]); // Navigate to 'Home/:id' route
          },1500)
        },
        error: (err) => {
          Swal.fire({
            title: "შეცდომა",
            text: "მეილი და პაროლი არასწორია",
            icon: "info"
          }); 
        }
      })
    }
  }

}
//   authForm: FormGroup;

//   constructor(     private fb: FormBuilder,
//     private UserService : UserService,
//     private router: Router,
//     private authService:AuthenticationService) {
//     this.authForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

// onSubmit(): void {
//     if (this.authForm.valid) {
//       const UserSignInDto:UserSignInDto  = this.authForm.value;
//       this.UserService.signInUser(UserSignInDto).subscribe({
//         next: (response) => {
//           console.log('User added successfully', response); 
//           const user: UserDto = {
//             id:response.userId,
//             Name: response.userName,
//             Email: response.email,
//             Password: response.password,
//             type: response.type, // Adjust according to your API response
//             Img: response.img,
//             Coin:response.coin,
//             ResetToken:response.resettoken
//                     };
      
//           // Save the user information in the AuthenticationService
//           this.authService.setCurrentUser(user);
//           const userId = response.userId; // Adjust this according to your API response
//           Swal.fire({
//             title: "შესრულდა",
//             text: "წარმატებით გაიარეთ ავტორიზაცია",
//             icon: "success",
//             showConfirmButton: false,
//             timer: 1800
//           });
//           // Use navigate with parameters after successful sign-in
//           setTimeout(()=>{
//             this.router.navigate(['/']); // Navigate to 'Home/:id' route
//           },1500)
//         },
//         error: (err) => {
//           Swal.fire({
//             title: "შეცდომა",
//             text: "მეილი და პაროლი არასწორია",
//             icon: "info"
//           }); 
//           console.error('Error adding UniCard', err);
//         }
//       })
//       console.log(this.authForm.value);
//     }
//   }
// }

