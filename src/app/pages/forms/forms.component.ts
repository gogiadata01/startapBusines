import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{
  cards:Icard[] = []
constructor(private cardService: CreateFormService) {
}
ngOnInit() {
    this.getAllCard()
}
getAllCard(){
    this.cardService
      .getAllCard()
      .snapshotChanges()
      .subscribe({
        next:(data) =>{
          this.cards = [];
          data.forEach((item) => {
            let Card = item.payload.toJSON() as Icard
            this.cards.push({
              key : item.key || '',
              title : Card.title ,
              text: Card.text,
              text2:Card.text2
              }
            )
          })
        }
      })
}
}
