import { Component ,inject ,ViewChild,ElementRef} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {HomeUniCardService} from '../../home-uni-card.service';
import { CommonModule } from '@angular/common';
import {UniCardDto} from '../../core/models/common.model'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-components',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './test-components.component.html',
  styleUrl: './test-components.component.scss'
})
export class TestComponentsComponent {
  private apiService = inject(HomeUniCardService);
  @ViewChild('Program') program!: ElementRef;
  @ViewChild('events') events!: ElementRef;
  @ViewChild('guide') guide!: ElementRef;
  cards: UniCardDto[] = [];

  constructor(
    private homeUniCardService: HomeUniCardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHomeUniCard(); 
  }

  getHomeUniCard(): void {
    this.homeUniCardService.getData().subscribe({
      next: (cards) => {
        this.cards = cards;
        console.log(cards);
      },
      error: (err) => {
        console.error('Error fetching UniCards', err);
      }
    });
  }

  ProgramClicked(){
      const displayStyle = this.events.nativeElement.style.display;
      this.events.nativeElement.style.display = displayStyle === 'none' ? 'none' : 'none';
      const displayStyle2 = this.guide.nativeElement.style.display;
      this.guide.nativeElement.style.display = displayStyle2 === 'none' ? 'none' : 'none';
      const displayStyle3 = this.program.nativeElement.style.display;
      this.program.nativeElement.style.display = displayStyle3 === 'none' ? 'block' : 'none';
    
  
    }
    EventClicked(){
      const displayStyle = this.events.nativeElement.style.display;
      this.events.nativeElement.style.display = displayStyle === 'none' ? 'flex' : 'none';
      const displayStyle1 = this.program.nativeElement.style.display;
      this.program.nativeElement.style.display = displayStyle1 === 'none' ? 'none' : 'none';
      const displayStyle2 = this.guide.nativeElement.style.display;
      this.guide.nativeElement.style.display = displayStyle2 === 'none' ? 'none' : 'none';
    }
    GuideClicked(){
      const displayStyle1 = this.program.nativeElement.style.display;
      this.program.nativeElement.style.display = displayStyle1 === 'none' ? 'none' : 'none';
      const displayStyle = this.events.nativeElement.style.display;
      this.events.nativeElement.style.display = displayStyle === 'none' ? 'none' : 'none';
      const displayStyle2 = this.guide.nativeElement.style.display;
      this.guide.nativeElement.style.display = displayStyle2 === 'none' ? 'block' : 'none';
    }

}
