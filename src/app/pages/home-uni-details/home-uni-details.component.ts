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
import {HomeUniCardService} from '../../home-uni-card.service'
import {UniCardDto} from '../../core/models/common.model'
@Component({
  selector: 'app-home-uni-details',
  standalone: true,
  imports: [NgIf,NavbarForPupilComponent,FooterForPupilComponent,NgFor,RouterLink,],
  templateUrl: './home-uni-details.component.html',
  styleUrl: './home-uni-details.component.scss'
})
export class HomeUniDetailsComponent {
  @ViewChild('Program') program!: ElementRef;
  @ViewChild('events') events!: ElementRef;
  @ViewChild('guide') guide!: ElementRef;

  card: any;
  cards:Icard[] = []
  sections: any = [];
  UniCard!: UniCardDto;
  constructor(private cardService: CreateFormService,private route: ActivatedRoute,private router: Router,private HomeUniCardService:HomeUniCardService, 
  ) {
}
ngOnInit(): void {


  // this.cardService.getHomeUniCardById(this.getid())
  // .subscribe( card =>{
  //   this.card = card
  //   console.log(this.cardService.getHomeUniCardById)
  // })
  // this.cardService.getHomeUniCardById(this.getid()).subscribe(sections =>{
  //     this.sections = sections;
  // })
  // this.route.queryParams.subscribe(params => {
  //   const data = params['data'];
  //   if (data) {
  //     this.sections = JSON.parse(data);
  //   }
  // });
  this.HomeUniCardService.getUniCard(this.getid())
  .subscribe({
    next:(Unicard)=> {
     this.UniCard = Unicard
      console.log('Program Cards:',this.UniCard); // Check if data is correctly coming
    },
    error: (err) => {
      console.error('Error fetching program data:', err);
    }
  })
  //   this.HomeUniCardService.getUniCard(this.getid()).subscribe(sections =>{
  //     this.sections = sections;
  // })
}

getid(){
  const cardId = this.route.snapshot.paramMap.get('id');
return cardId
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
  // OnFacultyClicked(cardkey: ,FacultyId:any){
  //   this.router.navigate(['/Pupil/HomeUni/',cardkey,FacultyId])

  // }
  FaclutyClicked(name:any){
    this.router.navigate(['/Pupil/HomeUni/',this.getid(),name])
  }
}
