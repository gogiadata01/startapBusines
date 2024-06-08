import { Component, OnInit, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { DrawerComponent } from '../../drawer/drawer.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss'
})
export class HomeCardComponent {
  cards:Icard[] = []
constructor(private cardService: CreateFormService, private router: Router) {
}
ngOnInit() {
    this.getAllCardById()
}
getAllCardById(){
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
              url:Uni.url
              }
            )
          })
        }
      })
}
onCardClicked(cardkey:any) :void{
  this.router.navigate(['/Pupil',cardkey])
}
}
