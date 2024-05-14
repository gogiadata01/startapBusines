import { Component } from '@angular/core';
import { NavbarForStudentComponent } from '../navbar-for-student/navbar-for-student.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NavbarForStudentComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

}
