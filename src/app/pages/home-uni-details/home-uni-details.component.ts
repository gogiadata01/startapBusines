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
import {UniCardDto} from '../../core/models/common.model'
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { gsap } from 'gsap';
import { ChangeDetectorRef } from '@angular/core';
import { NavbarWithWaveComponent } from "../navbar-with-wave/navbar-with-wave.component";

@Component({
  selector: 'app-home-uni-details',
  standalone: true,
  imports: [NgIf, NavbarForPupilComponent, FooterForPupilComponent, NgFor, RouterLink, CommonModule, NavbarWithWaveComponent],
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
  category = ""
  card: any;
  sections: any = [];
  UniCard!: UniCardDto;
  constructor(private route: ActivatedRoute,private router: Router,private HomeUniCardService:HomeUniCardService,     private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
}
@ViewChild('secondNavbar') secondNavbar!: ElementRef;
private isNavbarVisible = false;
private destroy$ = new Subject<void>();
private photoHeight = 0;
ngOnInit(): void {
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
onCardClicked1(cardkey:any) :void{
  this.router.navigate(['/Pupil/Events/',cardkey])
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
