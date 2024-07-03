import { NgIf } from '@angular/common';
import { Component,OnInit , Pipe, ViewChild, inject, AfterViewInit, asNativeElements, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators, } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { fromEvent, ignoreElements, pipe } from 'rxjs';
import { event, get, when } from 'jquery';
import { style } from '@angular/animations';
import { FormsModule  } from '@angular/forms';


import { __values } from 'tslib';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';
import { doc } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    NgIf, RouterLink, FormsModule,],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(()=>{
      Swal.fire({
        title: "აუცილებლად აირჩიე ტიპი",
        icon: "info"
      }); 
    },1000)
  }
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
  // asas = document.querySelector("")

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
        }
        // if(rawForm.role == "" ){
        //   Swal.fire({
        //     title: "ტიპის ველი ცარიელია",
        //     text: "აირჩიე მოსწავლე ან სტუდენტი",
        //     icon: "info"
        //   }); 
        // }
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
          text: "წარმატებით გაიარეთ ავტორიზაცია",
          icon: "success",
          showConfirmButton: false,
          timer: 1800
        });
        setTimeout(()=>{
          this.router.navigateByUrl('/')
        },1500)
      },
    
      
    })
  }
  






  
}








