import { Component,OnInit,  ViewChild ,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { data } from 'jquery';
import { Router } from '@angular/router';

import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';



@Component({
  selector: 'app-uni-details',
  standalone: true,
  imports: [NgIf,NavbarForPupilComponent,FooterForPupilComponent,NgFor,RouterLink,],
  templateUrl: './uni-details.component.html',
  styleUrl: './uni-details.component.scss'
})
export class UniDetailsComponent  {
  
}

