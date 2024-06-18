import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateFormService} from "../../core/services/create-form.service";
import {IUniFacultyCard} from "../../core/models/common.model";
import {Icard} from "../../core/models/common.model";
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-uni-program',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-uni-program.component.html',
  styleUrl: './home-uni-program.component.scss'
})
export class HomeUniProgramComponent {
  cards:IUniFacultyCard[] = []
  cards1:Icard[] = []
  constructor(private cardService: CreateFormService,private router: Router) {
    
  }
  ngOnInit(): void {
    this.getAllHomeUniFacultyCard()
  }

  getAllHomeUniFacultyCard(){
    this.cardService
    .getAllHomeUniFacultyCard()
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
    this.router.navigate(['/Pupil/HomeUniFaculty/',cardkey,cardtitl])
  }
}
