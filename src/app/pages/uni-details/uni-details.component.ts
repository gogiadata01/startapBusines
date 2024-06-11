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



@Component({
  selector: 'app-uni-details',
  standalone: true,
  imports: [NgIf,NavbarForPupilComponent,FooterForPupilComponent,NgFor,RouterLink,UniDetailsNavbarComponent,],
  templateUrl: './uni-details.component.html',
  styleUrl: './uni-details.component.scss'
})
export class UniDetailsComponent implements OnInit {
  
  
  @ViewChild('Program') program!: ElementRef;
  @ViewChild('events') events!: ElementRef;
  @ViewChild('guide') guide!: ElementRef;

  card: any;
  cards:Icard[] = []
  sections: any = [];

constructor(private cardService: CreateFormService,private route: ActivatedRoute) {
}
// ngOnInit() {
//     this.getAllCard()
// }
// getAllCard(){
//     this.cardService
//       .getAllHomeUniCard()
//       .snapshotChanges()წ
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


  const cardId = this.route.snapshot.paramMap.get('id');
  this.cardService.getHomeUniCardById(cardId)
  .subscribe( card =>{
    this.card = card
    console.log(this.cardService.getHomeUniCardById)
  })
  this.cardService.getHomeUniCardById(cardId).subscribe(sections =>{
      this.sections = sections;
  })
  this.route.queryParams.subscribe(params => {
    const data = params['data'];
    if (data) {
      this.sections = JSON.parse(data);
    }
  });
}
ProgramClicked(){
  // const displayStyle = this.program.nativeElement.style.display;
  //   this.program.nativeElement.style.display = displayStyle === 'none' ? 'block' : 'none'
    const displayStyle = this.events.nativeElement.style.display;
    this.events.nativeElement.style.display = displayStyle === 'none' ? 'none' : 'none';
    const displayStyle2 = this.guide.nativeElement.style.display;
    this.guide.nativeElement.style.display = displayStyle2 === 'none' ? 'none' : 'none';
    const displayStyle3 = this.program.nativeElement.style.display;
    this.program.nativeElement.style.display = displayStyle3 === 'none' ? 'block' : 'none';
  

  }
  EventClicked(){
    const displayStyle = this.events.nativeElement.style.display;
    this.events.nativeElement.style.display = displayStyle === 'none' ? 'flex' : 'none';
    const displayStyle1 = this.program.nativeElement.style.display;
    this.program.nativeElement.style.display = displayStyle1 === 'none' ? 'none' : 'none';
    const displayStyle2 = this.guide.nativeElement.style.display;
    this.guide.nativeElement.style.display = displayStyle2 === 'none' ? 'none' : 'none';
  }
  GuideClicked(){
    const displayStyle1 = this.program.nativeElement.style.display;
    this.program.nativeElement.style.display = displayStyle1 === 'none' ? 'none' : 'none';
    const displayStyle = this.events.nativeElement.style.display;
    this.events.nativeElement.style.display = displayStyle === 'none' ? 'none' : 'none';
    const displayStyle2 = this.guide.nativeElement.style.display;
    this.guide.nativeElement.style.display = displayStyle2 === 'none' ? 'block' : 'none';
  }

}

