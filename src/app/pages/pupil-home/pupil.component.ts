import { Component, OnInit, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { HomeUniProgramComponent } from '../home-uni-program/home-uni-program.component';
import { HomeUniCardComponent } from '../home-uni-card/home-uni-card.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HomeUniCardsProgramPageComponent } from '../home-uni-cards-program-page/home-uni-cards-program-page.component';



@Component({
  selector: 'app-pupil',
  standalone: true,
  imports: [NavbarForPupilComponent,HomeUniProgramComponent,HomeUniCardComponent, FooterForPupilComponent, CarouselComponent,RouterLink,HomeUniCardsProgramPageComponent],
  templateUrl: './pupil.component.html',
  styleUrl: './pupil.component.scss'
})
export class PupilComponent  {
//   cards:Icard[] = []
// constructor(private cardService: CreateFormService) {
// }
// ngOnInit() {
//     this.getAllCard()
// }
// getAllCard(){
//     this.cardService
//       .getAllHomeUniCard()
//       .snapshotChanges()
//       .subscribe({
//         next:(data) =>{
//           this.cards = [];
//           data.forEach((item) => {
//             let Uni = item.payload.toJSON() as Icard
//             this.cards.push({
//               key : item.key || '',
//               title : Uni.title ,
//               mainText: Uni.mainText,
//               url:Uni.url
//               }
//             )
//           })
//         }
//       })
// }









}

