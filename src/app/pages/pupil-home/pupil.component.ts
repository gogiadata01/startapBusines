import { Component, OnInit, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { DrawerComponent } from '../../drawer/drawer.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {HomeCardComponent} from '../home-card/home-card.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { RouterLink } from '@angular/router';
import { UniProgramsComponent } from '../uni-programs/uni-programs.component';

@Component({
  selector: 'app-pupil',
  standalone: true,
  imports: [NavbarForPupilComponent, DrawerComponent,FooterForPupilComponent,HomeCardComponent, CarouselComponent,RouterLink, UniProgramsComponent],
  templateUrl: './pupil.component.html',
  styleUrl: './pupil.component.scss'
})
export class PupilComponent  {
}

