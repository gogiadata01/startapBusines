import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementRef, } from '@angular/core';
import { IUniFacultyCard } from '../../core/models/common.model'
import { Icard } from '../../core/models/common.model'
import { Router } from '@angular/router';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component'
import { FooterForPupilComponent } from "../../pages/footer-for-pupil/footer-for-pupil.component";
import { QuizeComponent } from '../quize/quize.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { gsap } from 'gsap';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterForPupilComponent, QuizeComponent, UniProgramComponent, RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @Input() text: string = 'არჩიეთ თქვენთვის შესაფერისი პროგრამა';

  cards: IUniFacultyCard[] = []
  cards1: Icard[] = []
  constructor(private router: Router, private ngZone: NgZone) {
  }
  leaders1 = ['Person 1', 'Person 2', 'Person 3', 'Person 4'];
  leaders2 = ['Person 5', 'Person 6', 'Person 7', 'Person 8'];
  leaders3 = ['Person 9', 'Person 10', 'Person 11', 'Person 12'];

  containerStyle = {
    backgroundColor: 'rgba(93,115,126,0.9)',
    padding: '20px',
    borderRadius: '8px',
    width: '100%', 
    maxWidth: '1200px', 
    height: '350px',
    margin: '0 auto', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  };

  headerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '20px',
    width: '100%',
  };

  buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '4px 3px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '10px',
    transition: 'background-color 0.3s',
    display: 'flex',
    marginRight: '10px',

  };

  activeButtonStyle = {
    ...this.buttonStyle,
    backgroundColor: '#ee964b',
  };

  contentStyle = {
    display: 'flex', // აქ არის შეცვლილი
    justifyContent: 'space-between',
    gap: '20px', // სივრცე შორის
    flexWrap: 'wrap',
    width: '100%',
  };

  cardStyle = {
    backgroundColor: '#ced4da',
    height: '80px',

  };
  @ViewChild('secondNavbar') secondNavbar!: ElementRef;
  private isNavbarVisible = false;
  private destroy$ = new Subject<void>();
  private photoHeight = 0;

  ngOnInit() {
    const photoElement = document.querySelector('.photo-class') as HTMLElement;
    if (photoElement) {
      this.photoHeight = photoElement.offsetHeight;
    }

    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.onWindowScroll();
        });
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrolled = window.scrollY > 200;

    if (scrolled && !this.isNavbarVisible) {
      this.isNavbarVisible = true;
      this.slideDownNavbar();
    } else if (!scrolled && this.isNavbarVisible) {
      this.isNavbarVisible = false;
      this.slideUpNavbar();
    }
  }

  slideDownNavbar() {
    gsap.to(this.secondNavbar.nativeElement, { y: 0, duration: 0.3, ease: 'power2.out' });
  }

  slideUpNavbar() {
    gsap.to(this.secondNavbar.nativeElement, { y: -100, duration: 0.3, ease: 'power2.in' }); // Adjust -60 based on your navbar height
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
