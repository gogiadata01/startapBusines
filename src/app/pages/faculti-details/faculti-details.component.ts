import { Component,OnInit,  ViewChild ,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { data } from 'jquery';
import { DrawerComponent } from '../../drawer/drawer.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {HomeCardComponent} from '../home-card/home-card.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {UniDetailsNavbarComponent} from "../uni-details-navbar/uni-details-navbar.component"
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { snapshotChanges } from '@angular/fire/compat/database';
@Component({
  selector: 'app-faculti-details',
  standalone: true,
  imports: [ NgIf,NgFor,NavbarForPupilComponent,FooterForPupilComponent],
  templateUrl: './faculti-details.component.html',
  styleUrl: './faculti-details.component.scss'
})
export class FacultiDetailsComponent implements OnInit{
  cards:Icard[] = []
  card:any = []
  sections: any = [];


  constructor(private cardService: CreateFormService,private route: ActivatedRoute) {
  }

ngOnInit(): void {
  //  this.getAllCard()
   const FacultyId = this.route.snapshot.paramMap.get('id');
   this.cardService.getUniFacultyCardById(FacultyId)
   .subscribe(card =>{
    this.card = card
   })
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
          let Uni = item.payload.toJSON() as Icard
          this.cards.push({
            key : item.key || '',
            title : Uni.title ,
            mainText: Uni.mainText,
            url:Uni.url,
            history:Uni.history,
            forpupil:Uni.forpupil,
            sections:Uni.sections,
            ScholarshipAndFunding:Uni.ScholarshipAndFunding,
            ExchangePrograms:Uni.ExchangePrograms,
            Labs:Uni.Labs,
            Jobs: Uni.Jobs,
            StudentsLife:Uni.StudentsLife,
            PaymentMethods:Uni.PaymentMethods,
            Events:Uni.Events,
          }
          )
        })
      }
    })
    

  }
}

 
