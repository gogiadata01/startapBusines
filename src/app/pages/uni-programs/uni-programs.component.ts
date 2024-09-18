import { Component,OnInit,  ViewChild ,ElementRef, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Icard} from "../../core/models/common.model";
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { snapshotChanges } from '@angular/fire/compat/database';

@Component({
  selector: 'app-uni-programs',
  standalone: true,
  imports: [NavbarForPupilComponent,FooterForPupilComponent,NgIf,NgFor,CommonModule],
  templateUrl: './uni-programs.component.html',
  styleUrl: './uni-programs.component.scss'
})
export class UniProgramsComponent  {
}


