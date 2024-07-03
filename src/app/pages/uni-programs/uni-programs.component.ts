import { Component,OnInit,  ViewChild ,ElementRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {UniCardComponent} from '../Uni-card/uni-card.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { snapshotChanges } from '@angular/fire/compat/database';

@Component({
  selector: 'app-uni-programs',
  standalone: true,
  imports: [NavbarForPupilComponent,FooterForPupilComponent,NgIf,NgFor,CommonModule],
  templateUrl: './uni-programs.component.html',
  styleUrl: './uni-programs.component.scss'
})
export class UniProgramsComponent implements OnInit {
  card: Icard | null = null;
  Card: any = [];
  matchedProgram: any = null;
  mathcedSavaldebuloSagani:any = []
  mathcedAraSavaldebuloSagani:any = []


constructor(private cardService: CreateFormService, private route: ActivatedRoute, private router: Router) {}

ngOnInit() {
const cardId = this.getId();
const programName = this.getProgramName();

// console.log('Card ID:', cardId);
// console.log('Program Name:', programName);

this.cardService.getHomeUniCardByIdAndProgramName(cardId, programName).subscribe(
  card => {
    this.card = card;
    // console.log('Fetched Card:', this.card);

    if (this.card?.sections) {
      for (const section of this.card.sections) {
        for (const program of section.programNames) {
          if (program.programName === programName) {
            this.matchedProgram = program;
            break;
          }
        }
      }
    }
    // console.log('Matched Program:', this.matchedProgram);

    if (this.card?.sections2) {
      for (const section of this.card.sections2) {
        if (section.title === programName) {
          // console.log('Found SavaldebunoSagnebi:', section.SavaldebuloSagnebi);
          this.mathcedSavaldebuloSagani = section.SavaldebuloSagnebi; // Assign the array directly
          // console.log('Matched Savaldebulo Sagani:', this.mathcedSavaldebuloSagani);
          break;
        }
      }
    }

    if (this.card?.archevitisavaldebulosagani) {
      for (const archevitiSection of this.card.archevitisavaldebulosagani) {
        if (archevitiSection.title === programName) {
          // console.log('Found Archeviti Savaldebuno Sagnebi:', archevitiSection.ArchevitiSavaldebuloSagnebi);
          this.mathcedAraSavaldebuloSagani = archevitiSection.ArchevitiSavaldebuloSagnebi; // Assign the array directly
          // console.log('Matched Ara Savaldebulo Sagani:', this.mathcedAraSavaldebuloSagani);
          break;
        }
      }
    }
  },
  error => {
    console.error('Error:', error);
  }
);

this.cardService.getHomeUniFacultyCardById(programName).subscribe(
  card => {
    this.Card = card;
    // console.log('Fetched Card Faculty:', this.Card);
  },
  error => {
    console.error('Error:', error);
  }
);
}

getId(): string | null {
return this.route.snapshot.paramMap.get('id');
}

getProgramName(): string | null {
return this.route.snapshot.paramMap.get('n');
}
}


