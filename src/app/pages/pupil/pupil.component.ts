import { Component, OnInit, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { UniProgramComponent } from '../../core/UniProgram/uni-program.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {UniCardComponent} from '../Uni-card/uni-card.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {HomeUniCardComponent} from "../home-uni-card/home-uni-card.component"
import { HomeUniProgramComponent } from '../home-uni-program/home-uni-program.component';


@Component({
  selector: 'app-pupil',
  standalone: true,
  imports: [NavbarForPupilComponent, UniProgramComponent,FooterForPupilComponent,UniCardComponent, CarouselComponent,RouterLink,HomeUniCardComponent,HomeUniProgramComponent],
  templateUrl: './pupil.component.html',
  styleUrl: './pupil.component.scss'
})
export class PupilComponent  {
  
}

