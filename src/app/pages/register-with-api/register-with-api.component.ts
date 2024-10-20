import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { UserDto } from '../../core/models/common.model';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-with-api',
  standalone: true,
  imports: [    
    NgFor,
    NgIf,
    ReactiveFormsModule,RouterLink],
  templateUrl: './register-with-api.component.html',
  styleUrl: './register-with-api.component.scss'
})
export class RegisterWithApiComponent implements OnInit {
  RegisterForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private UserService : UserService,
    private router: Router,

  ){
    this.RegisterForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      Type: ['',Validators.required],
      Img: ['',],
      Coin:[0],
      ResetToken:['ResetToken']
    })

  }
  ngOnInit():void{
    Swal.fire({
      title: "გაფრთხილება",
      text: "დარეგისტრირდი სწორი იმეილით,რადგან პრიზის მოგების შემთხვევაში დაგიკავშირდეთ.",
      icon: "info",
      showConfirmButton: true,
    });
  }
  onSubmit(): void {
    if (this.RegisterForm.valid) {
      const UserDto:UserDto  = this.RegisterForm.value;
      this.UserService.registerUser(UserDto).subscribe({
        next: (response) => {
          Swal.fire({
            title: "შესრულდა",
            text: "წარმატებით გაიარეთ რეგისტრაცია",
            icon: "success",
            showConfirmButton: false,
            timer: 1800
          });
          // Use navigate with parameters after successful sign-in
          setTimeout(()=>{
            this.router.navigate(['/SignUp']); // Navigate to 'Home/:id' route
          },1500)
          console.log('User added successfully', response);
        },
        error: (err) => {
          console.error('Error adding UniCard', err);
        }
      })
      // console.log(this.RegisterForm.value);
    }
  }
}


// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../user.service';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
//  import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-register-with-api',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './register-with-api.component.html',
//   styleUrls: ['./register-with-api.component.scss']
// })
// export class RegisterWithApiComponent implements OnInit {
//   RegisterForm: FormGroup;
//   selectedFile: File | null = null; // To store the selected file

//   constructor(
//     private fb: FormBuilder,
//     private userService: UserService,
//     private router: Router
//   ) {
//     this.RegisterForm = this.fb.group({
//       UserName: ['', Validators.required],
//       Email: ['', [Validators.required, Validators.email]],
//       Password: ['', Validators.required],
//       Type: ['', Validators.required],
//       Img: [''],
//       Coin: [0],
//       ResetToken: ['ResetToken']
//     });
//   }

//   ngOnInit(): void {
//     Swal.fire({
//       title: "გაფრთხილება",
//       text: "დარეგისტრირდი სწორი იმეილით, რადგან პრიზის მოგების შემთხვევაში დაგიკავშირდეთ.",
//       icon: "info",
//       showConfirmButton: true,
//     });
//   }

//   // Handle the file input
//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//     }
//   }

//   onSubmit(): void {
//     if (this.RegisterForm.valid) {
//       const formData = new FormData();

//       // Append form data fields
//       formData.append('UserName', this.RegisterForm.get('UserName')?.value);
//       formData.append('Email', this.RegisterForm.get('Email')?.value);
//       formData.append('Password', this.RegisterForm.get('Password')?.value);
//       formData.append('Type', this.RegisterForm.get('Type')?.value);
//       formData.append('Coin', this.RegisterForm.get('Coin')?.value);
//       formData.append('ResetToken', this.RegisterForm.get('ResetToken')?.value);

//       // Append file if selected
//       if (this.selectedFile) {
//         formData.append('Img', this.selectedFile, this.selectedFile.name);
//       }

//       // Send the form data to the backend
//       this.userService.registerUser(formData).subscribe({
//         next: (response) => {
//           Swal.fire({
//             title: "შესრულდა",
//             text: "წარმატებით გაიარეთ რეგისტრაცია",
//             icon: "success",
//             showConfirmButton: false,
//             timer: 1800
//           });

//           setTimeout(() => {
//             this.router.navigate(['/SignUp']);
//           }, 1500);

//           console.log('User registered successfully', response);
//         },
//         error: (err) => {
//           console.error('Error registering user', err);
//         }
//       });
//     }
//   }
// }
