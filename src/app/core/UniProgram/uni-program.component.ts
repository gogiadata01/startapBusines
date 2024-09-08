import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateFormService} from "../services/create-form.service";
import {IUniFacultyCard} from "../models/common.model";
import {Icard} from "../models/common.model";
import { Router } from '@angular/router';
import {  AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';



@Component({
  selector: 'app-uni-program',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uni-program.component.html',
  styleUrl: './uni-program.component.scss',
})
export class UniProgramComponent   {

  cards:IUniFacultyCard[] = []
  cards1:Icard[] = []

  constructor(private cardService: CreateFormService,private router: Router) {
    
  }
  ngOnInit(): void {
    this.getHomeUniFacultyCard()
  }

  getHomeUniFacultyCard(){
    this.cardService
    .getAllUniFacultyCard()
    .snapshotChanges()
    .subscribe({
      next:(data) => {
        this.cards = [];
        data.forEach((item) => {
          let Card = item.payload.toJSON() as IUniFacultyCard
          this.cards.push({
            key: item.key|| "",
            title:Card.title,
            text:Card.text,
            sections:Card.sections
          })
        })
      }
    })
  }
  onCardClicked(cardkey:any,cardtitl:any) :void{
    this.router.navigate(['/Pupil/UniFaculty/',cardkey,cardtitl])
  }
  @ViewChildren('circle') circlesRef!: QueryList<ElementRef>;

  circles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Adjust the number of circles as needed
  activeCircleIndex: number = 0; // By default, the first circle is green

  // When a circle is clicked
  onCircleClick(index: number): void {
    this.activeCircleIndex = index; // Set the clicked circle as active
  }
  
}

