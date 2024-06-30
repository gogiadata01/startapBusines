import { Component,OnInit,  ViewChild ,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { data } from 'jquery';
import { Router } from '@angular/router';

import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {UniCardComponent} from '../Uni-card/uni-card.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';



@Component({
  selector: 'app-uni-details',
  standalone: true,
  imports: [NgIf,NavbarForPupilComponent,FooterForPupilComponent,NgFor,RouterLink,],
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

constructor(private cardService: CreateFormService,private route: ActivatedRoute,private router: Router) {
}
ngOnInit(): void {


  const cardId = this.route.snapshot.paramMap.get('id');
  this.cardService.getUniCardById(cardId)
  .subscribe( card =>{
    this.card = card
    console.log(this.cardService.getUniCardById)
  })
  this.cardService.getUniCardById(cardId).subscribe(sections =>{
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
  // FaclutyClicked(id:any){
  //   this.router.navigate(['/Pupil/HomeUni/Faculty/',id])
  // }
}

