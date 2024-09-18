import { Component } from '@angular/core';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { UniProgramComponent } from "../../core/UniProgram/uni-program.component";


@Component({
  selector: 'app-pupil-uni-page',
  standalone: true,
  imports: [FooterForPupilComponent, NavbarForPupilComponent, UniProgramComponent],
  templateUrl: './pupil-uni-page.component.html',
  styleUrl: './pupil-uni-page.component.scss'
})
export class PupilUniPageComponent {

}
