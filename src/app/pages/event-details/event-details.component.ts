import { Component } from '@angular/core';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import {NavbarForPupilComponent}from '../navbar-for-pupil/navbar-for-pupil.component'
import {EventCardDto} from "../../core/models/common.model";
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {EventCardService} from '../../event-card.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FooterForPupilComponent,NavbarForPupilComponent,RouterLink],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {
  EventCard!:EventCardDto
  constructor(private route: ActivatedRoute,private EventCardService: EventCardService, private router: Router) {
  }
  ngOnInit() {
    this.EventCardService.getEventCardById(this.getid())
    .subscribe({
      next:(Eventcard) =>{
        this.EventCard = Eventcard
        console.log('Event Cards:',this.EventCard); // Check if data is correctly coming

      },
      error: (err) => {
        console.error('Error fetching program data:', err);
      }
    })
}
getid(){
  const cardId = this.route.snapshot.paramMap.get('id');
return cardId
}
}
