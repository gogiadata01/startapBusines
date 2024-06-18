import { Component } from '@angular/core';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {UniCardComponent} from '../Uni-card/uni-card.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';


@Component({
  selector: 'app-pupil-uni-page',
  standalone: true,
  imports: [UniCardComponent,FooterForPupilComponent,NavbarForPupilComponent],
  templateUrl: './pupil-uni-page.component.html',
  styleUrl: './pupil-uni-page.component.scss'
})
export class PupilUniPageComponent {

}
