import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { UnicardEnDto, UniCardDto } from '../../core/models/common.model';
import { FooterForPupilComponent } from '../footer-for-pupil/footer-for-pupil.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { HomeUniCardService } from '../../home-uni-card.service';
import { UniCardEngService } from '../../uni-card-eng.service';
import {NewlineToParagraphsPipe} from "../../newline-to-paragraphs.pipe"
import { NavbarWithoutLanguageComponent } from "../navbar-without-language/navbar-without-language.component";

@Component({
  selector: 'app-uni-faculty-details',
  standalone: true,
  imports: [
    NavbarForPupilComponent,
    FooterForPupilComponent,
    NgIf,
    NgFor,
    CommonModule,
    NewlineToParagraphsPipe,
    NavbarWithoutLanguageComponent
],
  templateUrl: './uni-faculty-details.component.html',
  styleUrl: './uni-faculty-details.component.scss'
})
export class UniFacultyDetailsComponent implements OnInit {
  UniCard?: UniCardDto;
  UniCarden?: UnicardEnDto;
  programname: any;
  categories: any[] = [
    { title: "პროგრამის აღწერა" },
    { title: "დასაქმება" }
  ];
  category = "";
  language: 'ka' | 'en' = 'ka';

  constructor(
    private uniCardService: HomeUniCardService,
    private route: ActivatedRoute,
    private router: Router,
    private uniCardEnService: UniCardEngService
  ) {}

  ngOnInit(): void {
    this.language = (localStorage.getItem('language') as 'ka' | 'en') || 'ka';

    const programName = this.getProgramName();
    const id = this.getId();
    this.programname = id;

    console.log('Fetching data for ID:', id, 'Program Name:', programName, 'Lang:', this.language);

    if (!id || !programName) {
      console.error('Missing ID or Program Name in URL');
      return;
    }

    if (this.language === 'ka') {
      this.uniCardService.getUniCardByIdAndProgramName(id, programName).subscribe({
        next: (data: UniCardDto[]) => {
          if (data.length > 0) {
            this.UniCard = data[0];
            console.log('Georgian UniCard:', this.UniCard);
          } else {
            console.error('No data found for KA');
          }
        },
        error: (err) => {
          console.error('Error fetching KA data:', err);
        }
      });
    } else if (this.language === 'en') {
      this.uniCardEnService.getUniCardByIdAndProgramName(id, programName).subscribe({
        next: (data: UnicardEnDto[]) => {
          if (data.length > 0) {
            this.UniCarden = data[0];
            console.log('English UniCard:', this.UniCarden);
          } else {
            console.error('No data found for EN');
          }
        },
        error: (err) => {
          console.error('Error fetching EN data:', err);
        }
      });
    }
  }

  getId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  getProgramName(): string | null {
    return this.route.snapshot.paramMap.get('n');
  }
}

