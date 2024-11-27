import { Component, OnInit, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import { HomeUniCardComponent } from '../home-uni-card/home-uni-card.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {StupidUserComponent} from "../stupid-user/stupid-user.component"
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators} from "@angular/forms";
import {NgIf,CommonModule} from "@angular/common";
import { UrlHandlingStrategy} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
import { reduce } from 'rxjs';
import { query } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import {TestComponentsComponent} from '../test-components/test-components.component'


@Component({
  selector: 'app-pupil',
  standalone: true,
  imports: [TestComponentsComponent,NavbarForPupilComponent,HomeUniCardComponent, FooterForPupilComponent, CarouselComponent,RouterLink,StupidUserComponent
    ,ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FormsModule,
    CommonModule,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule],
  templateUrl: './pupil.component.html',
  styleUrl: './pupil.component.scss'
})
export class PupilComponent  {
}

