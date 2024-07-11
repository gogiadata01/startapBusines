import { Component, OnInit } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { RouterLink } from '@angular/router';
import {IUniFacultyCard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import {UniCardComponent} from '../Uni-card/uni-card.component'



@Component({
  selector: 'app-uni-program-page',
  standalone: true,
  imports: [NavbarForPupilComponent,RouterLink,UniProgramComponent,FooterForPupilComponent,UniCardComponent],
  templateUrl: './uni-program-page.component.html',
  styleUrl: './uni-program-page.component.scss'
})
export class UniProgramPageComponent implements OnInit {
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
            text:Card.text,
            sections:Card.sections
          })
        })
      }
    })
  }

}
