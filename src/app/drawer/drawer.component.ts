import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateFormService} from "../core/services/create-form.service";
import {IUniFacultyCard} from "../core/models/common.model";
import {Icard} from "../core/models/common.model";
import { Router } from '@angular/router';




@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent  {

  cards:IUniFacultyCard[] = []
  cards1:Icard[] = []

  constructor(private cardService: CreateFormService,private router: Router) {
    
  }
  ngOnInit(): void {
    this.getAllUniFacultyCard()
  }

  getAllUniFacultyCard(){
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
  onCardClicked(cardkey:any,cardtitl:any) :void{
    this.router.navigate(['/Pupil/UniFaculty/',cardkey,cardtitl])
  }

}


