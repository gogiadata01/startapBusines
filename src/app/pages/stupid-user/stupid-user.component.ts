import { Component,OnInit, ViewChildren, QueryList } from '@angular/core';
import {IUniFacultyCard} from "../../core/models/common.model";
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { HomeUniProgramComponent } from '../home-uni-program/home-uni-program.component';
import { HomeUniCardComponent } from '../home-uni-card/home-uni-card.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HomeUniCardsProgramPageComponent } from '../home-uni-cards-program-page/home-uni-cards-program-page.component';
import {UniProgramsComponent} from "../uni-programs/uni-programs.component"
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stupid-user',
  standalone: true,
  imports: [ CommonModule,
    FormsModule],
  templateUrl: './stupid-user.component.html',
  styleUrl: './stupid-user.component.scss'
})
export class StupidUserComponent implements OnInit {
  @ViewChildren('checkbox') checkboxes: QueryList<any> = new QueryList();
  cards: IUniFacultyCard[] = [];
  checkboxValues: string[] = [];
  matchedCheckboxValues:string = ""
  checkboxValue :any
  card:any

  constructor(
    private cardService: CreateFormService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submit(): void {
    this.checkboxValues = [];
    this.checkboxes.forEach((checkbox) => {
      if (checkbox.nativeElement.checked) {
        this.checkboxValues.push(checkbox.nativeElement.value);
      }
    });
    console.log(this.cards,this.checkboxValues)
    this.cardService.getUniFacultyCardByChackBoxName(this.checkboxValues)
    .subscribe(card => {
      this.card = card
    })
  }
  // filterCards(): void {
  //   this.matchedCheckboxValues = [];
  //   for (let item of this.cards) {
  //     for (let chackBox of item.ChackBoxNames) {
  //       if (chackBox.ChackBoxName.some(name => this.checkboxValues.includes(name))) {
  //         this.matchedCheckboxValues.push(item.title);
  //       }
  //     }
  //   }
  // }

  ngOnInit(): void {
    // this.cardService.getAllUniFacultyCard()
    //   .snapshotChanges()
    //   .subscribe(cardsSnapshot => {
    //     this.cards = cardsSnapshot.map(snapshot => snapshot.payload.val() as IUniFacultyCard);
    //   });

  }
}

