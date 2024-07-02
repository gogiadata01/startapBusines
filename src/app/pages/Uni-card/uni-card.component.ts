import { Component, OnInit, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import { Router } from '@angular/router';


@Component({
  selector: 'app-uni-card',
  standalone: true,
  imports: [],
  templateUrl: './uni-card.component.html',
  styleUrl: './uni-card.component.scss'
})
export class UniCardComponent {
  cards:Icard[] = []
constructor(private cardService: CreateFormService, private router: Router) {
}
ngOnInit() {
    this.getAllCard()
}
getAllCard(){
    this.cardService
      .getAllUniCard()
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
  this.router.navigate(['/Pupil/Uni',cardkey])
}
}
