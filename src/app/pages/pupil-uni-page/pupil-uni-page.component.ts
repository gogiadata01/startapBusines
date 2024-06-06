import { Component } from '@angular/core';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {HomeCardComponent} from '../home-card/home-card.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';


@Component({
  selector: 'app-pupil-uni-page',
  standalone: true,
  imports: [HomeCardComponent,FooterForPupilComponent,NavbarForPupilComponent],
  templateUrl: './pupil-uni-page.component.html',
  styleUrl: './pupil-uni-page.component.scss'
})
export class PupilUniPageComponent {

}
