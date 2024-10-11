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

@Component({
  selector: 'app-home-uni-details',
  standalone: true,
  imports: [NgIf,NavbarForPupilComponent,FooterForPupilComponent,NgFor,RouterLink,CommonModule],
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
  const photoElement = document.querySelector('.photo-class') as HTMLElement;
  if (photoElement) {
    this.photoHeight = photoElement.offsetHeight;
  }

  this.ngZone.runOutsideAngular(() => {
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.onWindowScroll();
      });
  });
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
onWindowScroll() {
  const scrolled = window.scrollY > 200;

  if (scrolled && !this.isNavbarVisible) {
    this.isNavbarVisible = true;
    this.slideDownNavbar();
    const button = document.getElementById("firstNavbarl");
    if (button) {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      if (isExpanded) button.click();
    }
  } else if (!scrolled && this.isNavbarVisible) {
    this.isNavbarVisible = false;
    this.slideUpNavbar();
    const button = document.getElementById("secondNavbar2");
    if (button) {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      if (isExpanded) button.click();
    }
  }
}

slideDownNavbar() {
  gsap.to(this.secondNavbar.nativeElement, { y: 0, duration: 0.3, ease: 'power2.out' });
}

slideUpNavbar() {
  gsap.to(this.secondNavbar.nativeElement, { y: -100, duration: 0.3, ease: 'power2.in' });
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
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
