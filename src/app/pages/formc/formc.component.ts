import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import {Router, RouterLink, UrlHandlingStrategy} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { reduce } from 'rxjs';
import { query } from 'firebase/firestore';

@Component({
  selector: 'app-formc',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent
    
  ],
  templateUrl:'./formc.component.html',
  styleUrl:'./formc.component.scss'
})
export class FormcComponent  {
  fb = inject(FormBuilder)
  createform = inject(CreateFormService)
  router = inject(Router)
  Form = this.fb.nonNullable.group({
    url : <unknown> ["",Validators.required] ,
    title :  ["",Validators.required],
    mainText:  ["",Validators.required],
    history:  ["",Validators.required],
    forpupil:  ["",Validators.required],
    programs:  ["",Validators.required],
    ScholarshipAndFunding:  ["",Validators.required],
    ExchangePrograms:  ["",Validators.required],
    Labs:  ["",Validators.required],
    Jobs:  ["",Validators.required],
    StudentsLife:  ["",Validators.required],
    PaymentMethods:  ["",Validators.required],
    Events:  ["",Validators.required],

  })
  Submit() : void {
    this.createform.AddHomeUniCard(this.Form.value as any)
  }

  // // UserForm!: FormGroup
  // AuthService = inject(AuthService)

  // constructor(  private fb:FormBuilder,private UserService: CreateFormService, private router :Router) {
  //   form  = this.fb.nonNullable.group({
  //     url : ["",Validators.required] ,
  //     title :  ["",Validators.required],
  //     maintext:  ["",Validators.required],
      
      
  //   }    )
  //    const url =""
  //   const reader = new FileReader();
  //   reader.readAsDataURL
    
  //   // reader.onload = () => {

  //   // }
  // }
  // alreadyUsedEmail = false;

  // GetAllUser(){
  //   this.UserService.getAllUser()
  //   .snapshotChanges()
  //   .subscribe({
  //     next: (data) => {
  //       if(data.values == this.UserForm.value)
  //     {
  //      this.alreadyUsedEmail = true;
  //      return
  //     }
  //     }
  //   })
  //   if(this.alreadyUsedEmail){
  //     alert("უკვე არსებობს ასეთი ემეილი")
  //   }

  // }

  // Submit(){
  //   this.UserService.addUser(this.UserForm.value)
  //       this.router.navigate(['/']);

  // }
  // ngOnInit(): void {
  //   this.AuthService.users$.subscribe((user) =>{
  //     if(user){
  //       this.AuthService.CurrentUserSign.set({
  //         email: user.email!,
  //         Username:user.displayName!
  //       })
  //     }else{
  //       this.AuthService.CurrentUserSign.set(null)
  //     }
  //     console.log(this.AuthService.CurrentUserSign())
  //    })
    
  // }

  // logOut(){
  //   console.log("logout")
  // }
  // submit(){
  //   this.cardService.AddCard(this.cardForm.value);
  //   this.router.navigate(['/']);
  // }
}
