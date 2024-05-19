import { Component, OnInit,  } from '@angular/core';
import { trigger,transition, style,animate } from '@angular/animations';
import { Router, RouterModule,  } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CreateFormService} from "../core/services/create-form.service";
import {IUniFacultyCard} from "../core/models/common.model";


@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent  {

  cards:IUniFacultyCard[] = []
  constructor(private cardService: CreateFormService) {
    
  }
  ngOnInit(): void {
    this.getAllCard()
  }
  getAllCard(){
    this.cardService
    .getAllUniFacultyCard()
    .snapshotChanges()
    .subscribe({
      next:(data) => {
        this.cards = [];
        data.forEach((item) => {
          let Card = item.payload.toJSON() as IUniFacultyCard
          this.cards.push({
            key: item.key|| "",
            title:Card.title,
            text:Card.text
          })
        })
      }
    })
  }
  
  // navigateToOtherPage(){
    
  // }

  // cards = [
  //   { text: 'ინფორმაციული ტექნოლოგიები', link: '' },
  //   { text: 'სამართალი', link: '' },
  //   { text: 'სამართალი', link: 'other' },
  //   { text: 'სამართალი', link: 'other' },
  //   { text: 'სამართალი', link: 'other' },
  //   { text: 'სამართალი', link: 'other' },
  //   { text: 'სამართალი', link: 'other' },
  //   { text: 'სამართალი', link: 'other' },
  //   { text: 'სამართალი', link: 'other' }
  // ];

  // constructor(private router: Router) {}

  // navigateTo(link: string): void {
  //   this.router.navigate([link]);
  // }

}
