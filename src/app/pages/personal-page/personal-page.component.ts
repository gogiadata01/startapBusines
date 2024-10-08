import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { UserDto } from '../../core/models/common.model';


@Component({
  selector: 'app-personal-page',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.scss'
})
export class PersonalPageComponent {

  username = 'სათაური: გინემ რამ';
  grade = 'კლასი: 9';
  balance = 777;
  email = 'forexample@gmail.com';

  logout() {
    // აქ უნდა იყოს ლოგ აუტის ლოგიკა
    console.log('User logged out');
  }
  
}
