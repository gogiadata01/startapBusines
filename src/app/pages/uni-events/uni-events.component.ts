import { Component , } from '@angular/core';
import { RouterLink } from '@angular/router';
import {UniDetailsComponent} from "../uni-details/uni-details.component"

@Component({
  selector: 'app-uni-events',
  standalone: true,
  imports: [RouterLink,UniDetailsComponent],
  templateUrl: './uni-events.component.html',
  styleUrl: './uni-events.component.scss'
})
export class UniEventsComponent {

}
