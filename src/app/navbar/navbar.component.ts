import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import {Router} from "@angular/router";
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
   auth = getAuth()
   User = this.auth.currentUser;

  AuthService = inject(AuthService)
  router = inject(Router)
    ngOnInit(): void {
    this.AuthService.users$.subscribe((user) =>{
      if(user){
        this.AuthService.CurrentUserSign.set({
          email: user.email!,
          Username:user.displayName!,
          role:user.photoURL!
          
    }
    )
    {

    }
      }
      if (this.User?.photoURL == "admin") {
        // console.log(this.User)
        this.router.navigateByUrl('/Admin')
      }
      if (this.User?.photoURL == "student" || this.User?.photoURL == "სტუდენტი"|| this.User?.photoURL == "studenti") {
        // console.log(this.User)
        this.router.navigateByUrl('/Students')
      }
      if (this.User?.photoURL == "pupil"|| this.User?.photoURL == "მოსწავლე"|| this.User?.photoURL == "moswavle") {
        // console.log(this.User)
        this.router.navigateByUrl('/Pupil')
      }
      
      // if(user){
      //   this.AuthService.CurrentUserSign.arguments.Username == "guest"
      //   this.router.navigateByUrl('/test')
      // }
      else{
        this.AuthService.CurrentUserSign.set(null)
        
      }
      // console.log(this.AuthService.CurrentUserSign())
     })
     
    
  }
  logOut(){
    this.AuthService.logout()
    this.router.navigateByUrl('/')
  }
  
}
