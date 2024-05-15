import { Component, OnInit } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";


@Component({
  selector: 'app-pupil',
  standalone: true,
  imports: [NavbarForPupilComponent],
  templateUrl: './pupil.component.html',
  styleUrl: './pupil.component.scss'
})
export class PupilComponent implements OnInit {
  cards:Icard[] = []
constructor(private cardService: CreateFormService) {
}
ngOnInit() {
    this.getAllCard()
}
getAllCard(){
    this.cardService
      .getAllHomeUniCard()
      .snapshotChanges()
      .subscribe({
        next:(data) =>{
          this.cards = [];
          data.forEach((item) => {
            let Card = item.payload.toJSON() as Icard
            this.cards.push({
              key : item.key || '',
              title : Card.title ,
              mainText: Card.mainText,
              url:Card.url
              }
            )
          })
        }
      })
}
}

