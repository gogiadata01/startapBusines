import { Component, OnInit, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import { HomeUniCardComponent } from '../home-uni-card/home-uni-card.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HomeUniCardsProgramPageComponent } from '../home-uni-cards-program-page/home-uni-cards-program-page.component';
import {UniProgramsComponent} from "../uni-programs/uni-programs.component"
import {StupidUserComponent} from "../stupid-user/stupid-user.component"
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators} from "@angular/forms";
import {NgIf,CommonModule} from "@angular/common";
import { UrlHandlingStrategy} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
import { reduce } from 'rxjs';
import { query } from 'firebase/firestore';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {TestComponentsComponent} from '../test-components/test-components.component'


@Component({
  selector: 'app-pupil',
  standalone: true,
  imports: [TestComponentsComponent,NavbarForPupilComponent,HomeUniCardComponent, FooterForPupilComponent, CarouselComponent,RouterLink,HomeUniCardsProgramPageComponent,StupidUserComponent
    ,ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FormsModule,
    CommonModule,
    HttpClientModule],
  templateUrl: './pupil.component.html',
  styleUrl: './pupil.component.scss'
})
export class PupilComponent  {
}

