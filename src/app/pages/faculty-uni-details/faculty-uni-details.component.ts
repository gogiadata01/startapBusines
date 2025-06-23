import { Component,OnInit,  ViewChild ,ElementRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {ProgramCardDto,ProgramnameDto,SavaldebuloSagnebiDto,ArchevitiSavaldebuloSagnebiDto, UniCardDto, UnicardEnDto} from "../../core/models/common.model";
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import {HomeUniCardService} from '../../home-uni-card.service'
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NavbarWithWaveComponent } from "../navbar-with-wave/navbar-with-wave.component";
import {UniCardEngService} from "../../uni-card-eng.service"
@Component({
  selector: 'app-faculty-uni-details',
  standalone: true,
  imports: [NavbarForPupilComponent, FooterForPupilComponent, NgIf, NgFor, CommonModule, RouterLink, NavbarWithWaveComponent],
  templateUrl: './faculty-uni-details.component.html',
  styleUrl: './faculty-uni-details.component.scss'
})
export class FacultyUniDetailsComponent {
  UniCard!: UniCardDto;  
  UniCardEn!: UnicardEnDto;  
  ProgramNames!:any  
  programname:any
  language: 'ka' | 'en' = 'ka';
categories: any[] = [
  { title: "პროგრამის აღწერა" },
  { title: "დასაქმება" }
];

  category = ""
  constructor(
    private UniCardEngService :UniCardEngService,
    private uniCardService: HomeUniCardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.language = (localStorage.getItem('language') as 'ka' | 'en') || 'ka';

    const programName = this.getProgramName();
    this.programname = this.getId();


    if (this.language === 'ka') {
      this.uniCardService.getUniCardByTitleAndProgramName(programName , this.programname).subscribe({
        next: (data: UniCardDto[]) => {
          if (data.length > 0) {
            this.UniCard = data[0];  // Extract the single object from the array
            console.log('Fetched uniCard:', this.UniCard);
          } else {
            console.error('No data found');
          }
        },
        error: (err) => {
          console.error('Error fetching program data:', err);
        }
      });
    }
    if (this.language === 'en') {
      this.UniCardEngService.getUniCardByTitleAndProgramName(programName , this.programname).subscribe({
        next: (data: UnicardEnDto[]) => {
          if (data.length > 0) {
            this.UniCardEn = data[0];  // Extract the single object from the array
            console.log('Fetched uniCard:', this.UniCardEn);
          } else {
            console.error('No data found');
          }
        },
        error: (err) => {
          console.error('Error fetching program data:', err);
        }
      });
    }
  }

  getId(): string | null {
    return this.route.snapshot.paramMap.get('id2');
  }

  getProgramName(): string | null {
    return this.route.snapshot.paramMap.get('n2');
  }

}
