import { Component, HostListener, OnInit, OnDestroy, NgZone, ViewChild, ElementRef, ViewChildren, QueryList, } from '@angular/core';
import { RouterLink } from '@angular/router';
import {AuthenticationService} from '../../authentication.service'
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar-for-pupil',
  standalone: true,
  imports: [CommonModule,RouterLink,NgIf],
  templateUrl: './navbar-for-pupil.component.html',
  styleUrl: './navbar-for-pupil.component.scss'
})
export class NavbarForPupilComponent implements OnInit {
  isLoggedIn = false;
  language: 'ka' | 'en' = 'ka';
  constructor(
    private User: AuthenticationService,
  ) { }
  ngOnInit(): void {
    const savedLang = localStorage.getItem('language') as 'ka' | 'en';
    if (savedLang) this.language = savedLang;
    this.isLoggedIn = this.User.isUserLoggedIn(); // Check login status
  }
  switchLanguage(lang: 'ka' | 'en'): void {
    this.language = lang;
    localStorage.setItem('language', lang); // შეინახე ენა
    location.reload()
  }
}
