import { Component,OnInit,  ViewChild ,ElementRef,NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf,NgFor, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { data } from 'jquery';
import { Router } from '@angular/router';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {HomeUniCardService} from '../../home-uni-card.service'
import {UniCardDto,UnicardEnDto} from '../../core/models/common.model'
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { gsap } from 'gsap';
import { ChangeDetectorRef } from '@angular/core';
import { NavbarWithWaveComponent } from "../navbar-with-wave/navbar-with-wave.component";
import {UniCardEngService} from "../../uni-card-eng.service"
import {NewlineToParagraphsPipe} from "../../newline-to-paragraphs.pipe"
import { NavbarWithoutLanguageComponent } from "../navbar-without-language/navbar-without-language.component";
@Component({
  selector: 'app-home-uni-details',
  standalone: true,
  imports: [NewlineToParagraphsPipe, NgIf, NavbarForPupilComponent, FooterForPupilComponent, NgFor, RouterLink, CommonModule, NavbarWithWaveComponent, NavbarWithoutLanguageComponent],
  templateUrl: './home-uni-details.component.html',
  styleUrl: './home-uni-details.component.scss'
})
export class HomeUniDetailsComponent {
  @ViewChild('Program') program!: ElementRef;
  @ViewChild('events') events!: ElementRef;
  @ViewChild('guide') guide!: ElementRef;
  categories:any=[{title:"პროგრამები"},
  {title:"სიახლეები"},
  {title:"გზამკვლევი"}]
  categorieseng:any=[{title:"Programs"},
  {title:"News"},
  {title:"Guide"}]
  category = ""
  categoryeng = ""
  card: any;
  sections: any = [];
  UniCard!: UniCardDto;
  UniCarden!: UnicardEnDto;

  constructor(private UniCardEnService: UniCardEngService,private route: ActivatedRoute,private router: Router,private HomeUniCardService:HomeUniCardService,     private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
}
@ViewChild('secondNavbar') secondNavbar!: ElementRef;
private isNavbarVisible = false;
private destroy$ = new Subject<void>();
private photoHeight = 0;
language: 'ka' | 'en' = 'ka';

ngOnInit(): void {
  this.language = (localStorage.getItem('language') as 'ka' | 'en') || 'ka';
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
  this.UniCardEnService.getUniCard(this.getid())
  .subscribe({
    next:(UniCarden)=> {
     this.UniCarden = UniCarden
      console.log('Program Cards:',this.UniCarden); // Check if data is correctly coming
    },
    error: (err) => {
      console.error('Error fetching program data:', err);
    }
  })
  //   this.HomeUniCardService.getUniCard(this.getid()).subscribe(sections =>{
  //     this.sections = sections;
  // })
}
onCardClicked1(cardkey:any,EventId:any) :void{
  this.router.navigate(['/Pupil/UniEvent/',cardkey,EventId])
}
getid(){
  const cardId = this.route.snapshot.paramMap.get('id');
return cardId
}
  // OnFacultyClicked(cardkey: ,FacultyId:any){
  //   this.router.navigate(['/Pupil/HomeUni/',cardkey,FacultyId])

  // }
  FaclutyClicked(name:any){
    this.router.navigate(['/Pupil/HomeUni/',this.getid(),name])
  }
}
