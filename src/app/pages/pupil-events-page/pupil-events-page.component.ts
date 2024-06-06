import { Component, OnInit,  } from '@angular/core';
import { EventCardsComponent } from '../event-cards/event-cards.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';

@Component({
  selector: 'app-pupil-events-page',
  standalone: true,
  imports: [EventCardsComponent,FooterForPupilComponent,NavbarForPupilComponent],
  templateUrl: './pupil-events-page.component.html',
  styleUrl: './pupil-events-page.component.scss'
})
export class PupilEventsPageComponent {

}
