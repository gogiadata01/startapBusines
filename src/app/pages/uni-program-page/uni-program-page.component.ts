import { Component, OnInit } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { RouterLink } from '@angular/router';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'



@Component({
  selector: 'app-uni-program-page',
  standalone: true,
  imports: [NavbarForPupilComponent, RouterLink, FooterForPupilComponent, UniProgramComponent],
  templateUrl: './uni-program-page.component.html',
  styleUrl: './uni-program-page.component.scss'
})
export class UniProgramPageComponent  {
}
