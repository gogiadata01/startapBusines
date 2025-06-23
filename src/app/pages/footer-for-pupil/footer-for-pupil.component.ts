import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild,} from '@angular/core';
import { CommonModule ,NgFor } from '@angular/common';

@Component({
  selector: 'app-footer-for-pupil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-for-pupil.component.html',
  styleUrl: './footer-for-pupil.component.scss'
})
export class FooterForPupilComponent  implements OnInit {
  language: 'ka' | 'en' = 'ka';
  ngOnInit() {
    const savedLang = localStorage.getItem('language') as 'ka' | 'en';
    if (savedLang) this.language = savedLang;
  }
  emailAddress = 'hello@myuni.ge';
}
