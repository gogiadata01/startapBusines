import { Component } from '@angular/core';
import { CarouselBasicComponent } from '../carousel-basic/carousel-basic.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CarouselBasicComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
