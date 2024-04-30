import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  AuthService = inject(AuthService)
  router = inject(Router)
    ngOnInit(): void {
    this.AuthService.users$.subscribe((user) =>{
      if(user){
        this.AuthService.CurrentUserSign.set({
          email: user.email!,
          Username:user.displayName!,
    })
      }else{
        this.AuthService.CurrentUserSign.set(null)
      }
      console.log(this.AuthService.CurrentUserSign())
     })
    
  }
  logOut(){
    this.AuthService.logout()
    this.router.navigateByUrl('/')
  }
}
