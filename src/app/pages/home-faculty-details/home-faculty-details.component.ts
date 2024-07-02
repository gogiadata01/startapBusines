import { Component,OnInit,  ViewChild ,ElementRef, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { data } from 'jquery';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {UniCardComponent} from '../Uni-card/uni-card.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { snapshotChanges } from '@angular/fire/compat/database';
import { Observable, } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-faculty-details',
  standalone: true,
  imports: [ NgIf,NgFor,NavbarForPupilComponent,FooterForPupilComponent,CommonModule],
  templateUrl: './home-faculty-details.component.html',
  styleUrl: './home-faculty-details.component.scss'
})
export class HomeFacultyDetailsComponent implements OnInit {
  cards:Icard[] = []
  card:any = []
  Card:any = []
  cards$: Observable<any[]> | undefined;


  constructor(private cardService: CreateFormService,private route: ActivatedRoute,private router: Router) {
  }

ngOnInit(): void {
   const FacultyId = this.route.snapshot.paramMap.get('id');
   this.cardService.getHomeUniFacultyCardById(FacultyId)
   .subscribe(Card =>{
    this.Card = Card
   })
  this.cards$ = this.cardService.getAllUniCard().valueChanges();

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
    this.router.navigate(['/Pupil/HomeUniFaculty', FacultyId, ProgramName, id, title]);
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
