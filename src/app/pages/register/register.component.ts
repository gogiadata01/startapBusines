import { NgIf } from '@angular/common';
import { Component, NgModule, Pipe, ViewChild, inject, AfterViewInit, asNativeElements, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators, } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { fromEvent, ignoreElements, pipe } from 'rxjs';
import { event, when } from 'jquery';
import { style } from '@angular/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    NgIf,RouterLink,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {
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
  @ViewChild('pupil')pupil:any
  @ViewChild('student')student:any
  asas = document.querySelector("")

  // Student(){
  //   this.rawForm.role == "სტუდენტი"
  // }
  // Pupil(){
  //   this.rawForm.role == "მოსწავლე"
  // }
  //  rawForm = this.Form.getRawValue();

  Submit() : void {
    const rawForm = this.Form.getRawValue();
    // this.Student()
    // this.Pupil
    this.authService.register(rawForm.email,rawForm.username,rawForm.password,rawForm.role).subscribe({
      error: (err) => {
        this.errormassage = err.code;
        if(rawForm.email == "" && rawForm.password == "" && rawForm.username  ==""&& rawForm.role == ""){
          
          Swal.fire({
            title: "შეცდომა",
            text: "ყველა ველის შევსება არის საჭირო",
            icon: "info"
          });
        }else if(rawForm.role == "" ){
          Swal.fire({
            title: "ტიპის ველი ცარიელია",
            text: "ჩაწერე მოსწავლე ან სტუდენტი",
            icon: "info"
          }); 
        }
        else if(this.errormassage == "auth/missing-password"){
          Swal.fire({
            title: "შეცდომა",
            text: "პაროლის ველი ცარიელია",
            icon: "info"
          }); 
        }
        else if(this.errormassage == "auth/invalid-email"){
          Swal.fire({
            title: "არავალიდური მაილი",
            text: "ჩაწერე ვალიდური მაილი",
            icon: "error"
          });
        }
        else if(this.errormassage == "auth/email-already-in-use"){
          Swal.fire({
            title: "შეცდომა",
            text: "შეცდომა უკვე არსებობს ასეთი მეილი",
            icon: "error"
          });
        }
        else if(this.errormassage == "auth/weak-password"){
          Swal.fire({
            title: "შეცდომა",
            text: "ცუდი პაროლია,ჩაწერე სხვა ცადე",
            icon: "info"
          }); 
        }
      }
      
      ,next: ()=>{
        Swal.fire({
          title: "შესრულდა",
          text: "წარმატებით გაიარეთ რეგისტრაცია",
          icon: "success"
        });
        setTimeout(()=>{
          this.router.navigateByUrl('/')
        },1500)
      },
    })
  }
  
}






