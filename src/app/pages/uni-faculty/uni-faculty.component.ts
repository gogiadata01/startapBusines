import { Component, OnInit } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { RouterLink } from '@angular/router';
import {IUniFacultyCard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import {FooterForpupilComponent} from '../footer-forpupil/footer-forpupil.component'



@Component({
  selector: 'app-uni-faculty',
  standalone: true,
  imports: [NavbarForPupilComponent,RouterLink,FooterForpupilComponent],
  templateUrl: './uni-faculty.component.html',
  styleUrl: './uni-faculty.component.scss'
})
export class UniFacultyComponent implements OnInit {
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

}
