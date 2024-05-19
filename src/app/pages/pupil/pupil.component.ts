import { Component, OnInit, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {FooterForpupilComponent} from '../footer-forpupil/footer-forpupil.component'
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { DrawerComponent } from '../../drawer/drawer.component';

@Component({
  selector: 'app-pupil',
  standalone: true,
  imports: [NavbarForPupilComponent,FooterForpupilComponent, DrawerComponent],
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
}

