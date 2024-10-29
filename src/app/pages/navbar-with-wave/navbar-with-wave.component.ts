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
@Component({
  selector: 'app-navbar-with-wave',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-with-wave.component.html',
  styleUrl: './navbar-with-wave.component.scss'
})
export class NavbarWithWaveComponent implements OnInit, OnDestroy {
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
    this.setPhotoHeight();
    this.setupScrollListener();
    this.User.currentUser$.subscribe((user) =>{
      this.currentUser = user;
      
    } )
  }
  onWindowScroll(): void {
    const scrolled = window.scrollY > 200;

    if (scrolled && !this.isNavbarVisible) {
      this.isNavbarVisible = true;
      this.slideDownNavbar();
      this.toggleNavbar('firstNavbarl');
    } else if (!scrolled && this.isNavbarVisible) {
      this.isNavbarVisible = false;
      this.slideUpNavbar();
      this.toggleNavbar('secondNavbar2');
    }
  }

  toggleNavbar(navbarId: string): void {
    const button = document.getElementById(navbarId);
    if (button) {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      if (isExpanded) button.click();
    }
  }

  setPhotoHeight(): void {
    const photoElement = document.querySelector('.photo-class') as HTMLElement;
    if (photoElement) {
      this.photoHeight = photoElement.offsetHeight;
    }
  }
  setupScrollListener(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.onWindowScroll();
        });
    });
  }

  slideDownNavbar(): void {
    gsap.to(this.secondNavbar.nativeElement, { y: 0, duration: 0.3, ease: 'power2.out' });
  }

  slideUpNavbar(): void {
    gsap.to(this.secondNavbar.nativeElement, { y: -100, duration: 0.3, ease: 'power2.in' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
