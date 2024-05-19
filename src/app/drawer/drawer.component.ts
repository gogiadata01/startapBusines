import { Component, OnInit,  } from '@angular/core';
import { trigger,transition, style,animate } from '@angular/animations';
import { Router, RouterModule,  } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent  {


  
  // navigateToOtherPage(){
    
  // }

  cards = [
    { text: 'ინფორმაციული ტექნოლოგიები', link: '' },
    { text: 'სამართალი', link: '' },
    { text: 'სამართალი', link: 'other' },
    { text: 'სამართალი', link: 'other' },
    { text: 'სამართალი', link: 'other' },
    { text: 'სამართალი', link: 'other' },
    { text: 'სამართალი', link: 'other' },
    { text: 'სამართალი', link: 'other' },
    { text: 'სამართალი', link: 'other' }
  ];

  constructor(private router: Router) {}

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

}
