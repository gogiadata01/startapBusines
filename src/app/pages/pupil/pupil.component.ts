import { Component } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';

@Component({
  selector: 'app-pupil',
  standalone: true,
  imports: [NavbarForPupilComponent],
  templateUrl: './pupil.component.html',
  styleUrl: './pupil.component.scss'
})
export class PupilComponent {

}
