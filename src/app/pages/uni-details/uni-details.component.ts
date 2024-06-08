import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import { NgIf } from '@angular/common';
import { data } from 'jquery';
import { DrawerComponent } from '../../drawer/drawer.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {HomeCardComponent} from '../home-card/home-card.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';



@Component({
  selector: 'app-uni-details',
  standalone: true,
  imports: [NgIf,NavbarForPupilComponent,FooterForPupilComponent],
  templateUrl: './uni-details.component.html',
  styleUrl: './uni-details.component.scss'
})
export class UniDetailsComponent implements OnInit {
  card: any;
  // cards:Icard[] = []
constructor(private cardService: CreateFormService,private route: ActivatedRoute) {
}
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
ngOnInit(): void {
  // const cardId = this.route.snapshot.paramMap.get('id');
  // this.cardService.getHomeUniCardById(cardId)
  // .snapshotChanges()
  // .subscribe( card =>{
  //   this.card = card
  //   console.log(this.cardService.getHomeUniCardById)
  // })

    const cardId = this.route.snapshot.paramMap.get('id');
  this.cardService.getHomeUniCardById(cardId)
  .subscribe(card => {
    this.card = card
  })
}
}
