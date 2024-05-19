import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    NgIf,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  Form = this.fb.nonNullable.group({
    username :  ["",Validators.required] ,
    email :  ["",Validators.required],
    password:  ["",Validators.required],
    role:  ["",Validators.required],
  })
  errormassage: string| null = null 

  Submit() : void {
    const rawForm = this.Form.getRawValue();
    this.authService.register(rawForm.email,rawForm.username,rawForm.password,rawForm.role).subscribe({
      next: ()=>{
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        this.errormassage = err.code;
        if(this.errormassage == "auth/invalid-email"){
          Swal.fire({
            title: "არავალიდური მაილი",
            text: "ჩაწერე ვალიდური მაილი",
            icon: "error"
          });
        }
        if(this.errormassage == "auth/email-already-in-use"){
          Swal.fire({
            title: "შეცდომა",
            text: "შეცდომა უკვე არსებობს ასეთი მეილი",
            icon: "error"
          });
        }if(this.errormassage == "auth/weak-password"){
          Swal.fire({
            title: "შეცდომა",
            text: "ცუდი პაროლია,ჩაწერე სხვა",
            icon: "info"
          }); 
        }
      }
    })
  }
  
}






