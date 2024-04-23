import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CreateFormService} from "../../core/services/create-form.service";
// import {Icard} from "../../core/models/common.model";
<<<<<<< HEAD
import {Router, RouterLink} from "@angular/router";
=======
import {Router} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
>>>>>>> 251d6e09384f99e654402b060dd0bb2070699aec

@Component({
  selector: 'app-formc',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
<<<<<<< HEAD
    RouterLink
=======
    NavbarComponent
>>>>>>> 251d6e09384f99e654402b060dd0bb2070699aec
  ],
  templateUrl: './formc.component.html',
  styleUrl: './formc.component.scss'
})
export class FormcComponent {
  UserForm!: FormGroup

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
  logOut(){
    console.log("logout")
  }
  // submit(){
  //   this.cardService.AddCard(this.cardForm.value);
  //   this.router.navigate(['/']);
  // }
}
