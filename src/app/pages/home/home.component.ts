import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import {IUniFacultyCard} from '../../core/models/common.model'
import {Icard} from '../../core/models/common.model'
import {CreateFormService} from "../../core/services/create-form.service";
import { Router } from '@angular/router';
import {UniProgramComponent} from '../../core/UniProgram/uni-program.component'
import { UniCardComponent } from "../Uni-card/uni-card.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UniProgramComponent, UniCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cards:IUniFacultyCard[] = []
  cards1:Icard[] = []
  constructor(private cardService: CreateFormService,private router: Router) {
    
  }
  leaders1 = ['Person 1', 'Person 2', 'Person 3', 'Person 4'];
  leaders2 = ['Person 5', 'Person 6', 'Person 7', 'Person 8'];
  leaders3 = ['Person 9', 'Person 10', 'Person 11', 'Person 12'];
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
