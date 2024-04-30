import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CreateFormService} from "../../core/services/create-form.service";
// import {Icard} from "../../core/models/common.model";
import {Router, RouterLink} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-formc',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './formc.component.html',
  styleUrl: './formc.component.scss'
})
export class FormcComponent  {
  UserForm!: FormGroup
  AuthService = inject(AuthService)

  constructor(  private fb:FormBuilder,private UserService: CreateFormService, private router :Router) {
    this.UserForm = this.fb.group({
      name:new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("" , [Validators.required])
    })
  //  const UserAray = this.UserService.getAllUser

  }
  alreadyUsedEmail = false;

  GetAllUser(){
    this.UserService.getAllUser()
    .snapshotChanges()
    .subscribe({
      next: (data) => {
        if(data.values == this.UserForm.value)
      {
       this.alreadyUsedEmail = true;
       return
      }
      }
    })
    if(this.alreadyUsedEmail){
      alert("უკვე არსებობს ასეთი ემეილი")
    }

  }

  Submit(){
    this.UserService.addUser(this.UserForm.value)
        this.router.navigate(['/']);

  }
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

  logOut(){
    console.log("logout")
  }
  // submit(){
  //   this.cardService.AddCard(this.cardForm.value);
  //   this.router.navigate(['/']);
  // }
}
