import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  leaders1 = ['Person 1', 'Person 2', 'Person 3', 'Person 4'];
  leaders2 = ['Person 5', 'Person 6', 'Person 7', 'Person 8'];
  leaders3 = ['Person 9', 'Person 10', 'Person 11', 'Person 12'];
}
