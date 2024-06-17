import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateFormService} from "../services/create-form.service";
import {IUniFacultyCard} from "../models/common.model";
import {Icard} from "../models/common.model";
import { Router } from '@angular/router';




@Component({
  selector: 'app-uni-program',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uni-program.component.html',
  styleUrl: './uni-program.component.scss',
})
export class UniProgramComponent  {

  cards:IUniFacultyCard[] = []
  cards1:Icard[] = []

  constructor(private cardService: CreateFormService,private router: Router) {
    
  }
  ngOnInit(): void {
    this.getHomeUniFacultyCard()
  }

  getHomeUniFacultyCard(){
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


