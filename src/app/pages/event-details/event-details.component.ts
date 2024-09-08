import { Component } from '@angular/core';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import {NavbarForPupilComponent}from '../navbar-for-pupil/navbar-for-pupil.component'
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FooterForPupilComponent,NavbarForPupilComponent,RouterLink],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {
  cards:Icard[] = []
  constructor(private cardService: CreateFormService, private router: Router) {
  }
  ngOnInit() {
    this.getAllHomeCard()
}
getAllHomeCard(){
    this.cardService
      .getHomeAllUniCard()
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
              sections2:Uni.sections2,
              archevitisavaldebulosagani:Uni.archevitisavaldebulosagani,
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
onCardClicked(cardkey:any) :void{
  this.router.navigate(['/Pupil/HomeUni/',cardkey])
}
}
