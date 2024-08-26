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
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,AddWithApiHomeUniCardComponent,AddWithApiProgramCardComponent,AddWithApiEventCardComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  user: UserDto | null = null; // Initialize user as null to ensure it's defined
  currentUser: UserDto | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router // Include router in the constructor
    ,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''; // Provide an empty string as a default
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser)
    })

    if(this.currentUser?.type === "admin") {

    }else if(this.currentUser?.type === "მოსწავლე IX კლასელი"|| "მოსწავლე X კლასელი"){
     this.router.navigateByUrl('/Pupil');
    }
  }
}
