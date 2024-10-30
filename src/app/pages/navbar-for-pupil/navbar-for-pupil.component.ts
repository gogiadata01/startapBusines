import { Component, HostListener, OnInit, OnDestroy, NgZone, ViewChild, ElementRef, ViewChildren, QueryList, } from '@angular/core';
import { RouterLink } from '@angular/router';
import {AuthenticationService} from '../../authentication.service'
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar-for-pupil',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './navbar-for-pupil.component.html',
  styleUrl: './navbar-for-pupil.component.scss'
})
export class NavbarForPupilComponent implements OnInit {
  isLoggedIn = false;
  constructor(
    private User: AuthenticationService,
  ) { }
  ngOnInit(): void {
    this.isLoggedIn = this.User.isUserLoggedIn(); // Check login status
  }
}
