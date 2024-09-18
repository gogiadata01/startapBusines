import { Component,OnInit,  ViewChild ,ElementRef, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import {ProgramCardDto, UniCardDto} from "../../core/models/common.model";
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { data } from 'jquery';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { snapshotChanges } from '@angular/fire/compat/database';
import { Observable, } from 'rxjs';
import { Router } from '@angular/router';
import {HomeUniCardService} from '../../home-uni-card.service'
import {ProgramCardService} from '../../program-card.service'
@Component({
  selector: 'app-faculti-details',
  standalone: true,
  imports: [ NgIf,NgFor,NavbarForPupilComponent,FooterForPupilComponent,CommonModule],
  templateUrl: './faculti-details.component.html',
  styleUrl: './faculti-details.component.scss'
})
export class FacultiDetailsComponent implements OnInit{
  // cards:Icard[] = []
  // card:any = []
  // Card:any = []
  // cards$: Observable<any[]> | undefined;
  ProgramCard!:ProgramCardDto
  UniCard:UniCardDto[]=[]
  ProgramName:any

  constructor(private programCardService:ProgramCardService,private UniCardService: HomeUniCardService,private route: ActivatedRoute,private router: Router) {
  }

ngOnInit(): void {
   const FacultyId = this.route.snapshot.paramMap.get('id');
   this.ProgramName = this.route.snapshot.paramMap.get('n')
  
  //  console.log(FacultyId,ProgramName)
  //  this.cardService.getUniFacultyCardById(FacultyId)
  //  .subscribe(Card =>{
  //   this.Card = Card
  //  })
  // this.cards$ = this.cardService.getAllUniCard().valueChanges();

  this.GetAllUniCard()
}
GetAllUniCard(){
  this.UniCardService.getData().subscribe({
    next:(Unicard) => {
      this.UniCard = Unicard;
      console.log('Uni Cards:', this.UniCard); // Check if data is correctly coming
    },
    error: (err) => {
      console.error('Error fetching program data:', err);
    }
  })
}
getId(): string | null {
  return this.route.snapshot.paramMap.get('id');
}

getProgramName(): string | null {
  return this.route.snapshot.paramMap.get('n');
}

OnCardClicked(id: any, title: any) {
  const FacultyId = this.getId();
  const ProgramName = this.getProgramName();
  // const encodedTitle = encodeURIComponent(title);

  if (FacultyId && ProgramName && id && title) {
    this.router.navigate(['/Pupil/UniFaculty', FacultyId, ProgramName, id, title]);
  } else {
    console.error('Error: One of the parameters is undefined', {
      FacultyId,
      ProgramName,
      id,
      title
    });
  }
}
trackByIndex(index: number): number {
  return index;
}

}

 
