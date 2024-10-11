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
