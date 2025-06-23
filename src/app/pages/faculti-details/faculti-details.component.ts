import { Component,OnInit,OnDestroy, NgZone, ViewChild ,ElementRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UniversityProgramVisitService} from '../../university-program-visit.service'
import { ActivatedRoute } from '@angular/router';
import {ProgramCardDto, UniCardDto, UniCardForFacultyDetails, ProgramCardEnDto, UnicardEnDto, UniCardForFacultyDetailsEn, } from "../../core/models/common.model";
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { data } from 'jquery';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { Observable, } from 'rxjs';
import { Router } from '@angular/router';
import {HomeUniCardService} from '../../home-uni-card.service'
import {ProgramCardService} from '../../program-card.service'
import { gsap } from 'gsap';
import {  AfterViewInit,  ViewChildren, QueryList } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import {UniCardEngService} from "../../uni-card-eng.service"
import { NavbarWithWaveComponent } from "../navbar-with-wave/navbar-with-wave.component";
import { NavbarWithoutLanguageComponent } from "../navbar-without-language/navbar-without-language.component";
@Component({
  selector: 'app-faculti-details',
  standalone: true,
  imports: [NgIf, NgFor, NavbarForPupilComponent, FooterForPupilComponent, CommonModule, RouterLink, NavbarWithWaveComponent, NavbarWithoutLanguageComponent],
  templateUrl: './faculti-details.component.html',
  styleUrl: './faculti-details.component.scss'
})
export class FacultiDetailsComponent implements OnInit{
  ProgramCard!: ProgramCardDto;
  UniCard: UniCardForFacultyDetails[] = [];
  UniCarden: UniCardForFacultyDetailsEn[] = [];
  ProgramName:any;
  language: 'ka' | 'en' = 'ka';

  private prioritizedUniversities: string[] = [
    'საქართველოს უნივერსიტეტი',
    // 'თბილისის ივანე ჯავახიშვილის სახელობის სახელმწიფო უნივერსიტეტი',
    // 'ნიუ ვიჟენ უნივერსიტეტი'
  ];
  constructor(private UniCardEngService :UniCardEngService,private UniversityProgramVisit:UniversityProgramVisitService,private ngZone: NgZone,private cdr: ChangeDetectorRef,private programCardService:ProgramCardService,private UniCardService: HomeUniCardService,private route: ActivatedRoute,private router: Router) {
  }

ngOnInit(): void {
  this.language = (localStorage.getItem('language') as 'ka' | 'en') || 'ka';
   this.ProgramName = this.route.snapshot.paramMap.get('n')
   
   if (this.language === 'ka') {
    this.GetAllUniCard();
  } else if (this.language === 'en') {
    this.GetAllUniCardEn();
  }
}
GetAllUniCard() {
  this.UniCardService.getUniCardByProgramName(this.ProgramName).subscribe({
    next: (Unicard) => {
      this.UniCard = Unicard;
      console.log('Original Uni Cards:', this.UniCard);

      // Sort the university cards
      this.sortUniCards();

      // Detect changes after sorting
      this.cdr.detectChanges();

      console.log('Sorted Uni Cards:', this.UniCard);
    },
    error: (err) => {
      console.error('ამ პროგრამაზე ჯერ არ არსებობს უნივერსიტეტი');
    }
  });
}
GetAllUniCardEn() {
  this.UniCardEngService.getUniCardByProgramName(this.ProgramName).subscribe({
    next: (UniCarden) => {
      this.UniCarden = UniCarden;
      console.log('Original Uni Cards:', this.UniCarden);

      // Sort the university cards
      this.sortUniCards();

      // Detect changes after sorting
      this.cdr.detectChanges();

      console.log('Sorted Uni Cards:', this.UniCarden);
    },
    error: (err) => {
      console.error('ამ პროგრამაზე ჯერ არ არსებობს უნივერსიტეტი');
    }
  });
}



private sortUniCards(): void {
  this.UniCard.sort((a, b) => {
    const aPriority = this.prioritizedUniversities.indexOf(a.title);
    const bPriority = this.prioritizedUniversities.indexOf(b.title);

    const aIndex = aPriority !== -1 ? aPriority : Infinity;
    const bIndex = bPriority !== -1 ? bPriority : Infinity;

    return aIndex - bIndex;
  });
}

getId(): string | null {
  return this.route.snapshot.paramMap.get('id');
}

getProgramName(): string | null {
  return this.route.snapshot.paramMap.get('n');
}

OnCardClicked(id: any, title: any) {
  this.UniversityProgramVisit.logVisit(title,id).subscribe({
    next: () => {
      console.log('Visit logged successfully');
    },
    error: (err) => {
      console.error('Failed to log visit:', err);
    }
  });

  const FacultyId = this.getId();
  const ProgramName = this.getProgramName();

  if ( ProgramName && id && title) {
    this.router.navigate(['/Pupil/UniFaculty', ProgramName, id, title]);
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

 
