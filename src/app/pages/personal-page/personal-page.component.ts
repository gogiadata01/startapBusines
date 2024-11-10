import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Component, HostListener, OnInit, OnDestroy, NgZone, ViewChild, ElementRef, ViewChildren, QueryList, } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FooterForPupilComponent } from '../../pages/footer-for-pupil/footer-for-pupil.component';
import { ProgramCardService } from '../../program-card.service';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { Subject, fromEvent } from 'rxjs';
import {UserDto} from '../../core/models/common.model'
import { takeUntil } from 'rxjs/operators';
import {AuthenticationService} from '../../authentication.service'
import { NavbarForPupilComponent } from "../navbar-for-pupil/navbar-for-pupil.component";
@Component({
  selector: 'app-personal-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NavbarForPupilComponent],
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.scss'
})
export class PersonalPageComponent implements OnInit {
  @ViewChild('secondNavbar') secondNavbar!: ElementRef;
  private isNavbarVisible = false;
  private destroy$ = new Subject<void>();
  private photoHeight: number = 0; // Ensure it's declared properly
  currentUser: UserDto | null = null;
  constructor(
    private router: Router,
    private programCardService: ProgramCardService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private User: AuthenticationService,
  ) { }
  ngOnInit(): void {
    this.User.currentUser$.subscribe((user) =>{
      this.currentUser = user;
      if (!this.currentUser) {
        this.router.navigateByUrl('/SignUp'); 
      }
  
    } )
  }

  LogOut(){
    this.User.clearCurrentUser()
    this.router.navigateByUrl('SignUp')
  }
}
