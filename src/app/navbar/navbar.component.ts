import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService} from '../authentication.service';
import {Router} from "@angular/router";
import { User, getAuth } from "firebase/auth";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import {UserDto} from '../core/models/common.model'
import { idToken } from '@angular/fire/auth';
import {AddWithApiHomeUniCardComponent} from '../pages/add-with-api-uni-card/add-with-api-home-uni-card.component'
import {AddWithApiProgramCardComponent} from '../pages/add-with-api-program-card/add-with-api-program-card.component'
import {AddWithApiEventCardComponent} from '../pages/add-with-api-event-card/add-with-api-event-card.component'
import { AddQuizWithApiComponent } from "../pages/add-quiz-with-api/add-quiz-with-api.component";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AddWithApiHomeUniCardComponent, AddWithApiProgramCardComponent, AddWithApiEventCardComponent, AddQuizWithApiComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  currentUser: UserDto | null = null;
  UserId:any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
  this.UserId = this.authService.getNameIdentifier()
  this.getUser();
  }
  getUser(){
    this.userservice.getUserById(this.UserId).subscribe((user) =>{
      this.currentUser = user
      if(this.currentUser?.type === "admin") {
        this.router.navigateByUrl('Home')
      }else if(this.currentUser?.type === "მოსწავლე IX კლასელი"|| "მოსწავლე X კლასელი" ||"მოსწავლე XI კლასელი" ||"მოსწავლე XII კლასელი"){
       this.router.navigateByUrl('');
      }
    })
  }
}


