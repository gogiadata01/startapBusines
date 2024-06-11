import { Component, OnInit, inject, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { DrawerComponent } from '../../drawer/drawer.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-uni-details-navbar',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink],
  templateUrl: './uni-details-navbar.component.html',
  styleUrl: './uni-details-navbar.component.scss'
})
export class UniDetailsNavbarComponent {
  routerid:number = 0
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
              Events:Uni.Events
              }
            )
          })
        }
      })
}
// EventClicked(cardkey:any) :void{
//   this.router.navigate(['/Pupil',cardkey,"/Event"])
// }
// ProgramClicked(cardkey:any) :void{
//   this.router.navigate(['/Pupil',cardkey])
// }

}
