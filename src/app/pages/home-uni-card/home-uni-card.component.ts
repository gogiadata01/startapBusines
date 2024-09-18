import { Component, OnInit, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {UniCardDto} from "../../core/models/common.model";

import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {HomeUniCardService} from '../../home-uni-card.service'

@Component({
  selector: 'app-home-uni-card',
  standalone: true,
  imports: [RouterLink, FooterForPupilComponent],
  templateUrl: './home-uni-card.component.html',
  styleUrl: './home-uni-card.component.scss'
})
export class HomeUniCardComponent {
  cards:Icard[] = []
  UniCard:UniCardDto[]=[]

  constructor( private router: Router,private HomeUniCardService:HomeUniCardService) {
  }
  ngOnInit() {
    this.GetAllUniCard()
}
GetAllUniCard(){
  this.HomeUniCardService.getData().subscribe({
    next:(Unicard) => {
      this.UniCard = Unicard;
      console.log('Program Cards:', this.UniCard); // Check if data is correctly coming
    },
    error: (err) => {
      console.error('Error fetching program data:', err);
    }
  })
}
onCardClicked(cardkey:any) :void{
  this.router.navigate(['/Pupil/HomeUni/',cardkey])
}
}
