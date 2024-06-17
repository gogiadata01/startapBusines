import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import {Router, RouterLink, UrlHandlingStrategy} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { reduce } from 'rxjs';
import { query } from 'firebase/firestore';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  fb = inject(FormBuilder)
  createform = inject(CreateFormService)
  router = inject(Router)
  Form = this.fb.nonNullable.group({
    title: ["",Validators.required] ,
    text :  ["",Validators.required],
  })
  Submit() : void {
    this.createform.AddUniFacultyCard(this.Form.value as any)
  }
//   cards:Icard[] = []
// constructor(private cardService: CreateFormService) {
// }
// ngOnInit() {
//     this.getAllCard()
// }
// getAllCard(){
//     this.cardService
//       .getAllCard()
//       .snapshotChanges()
//       .subscribe({
//         next:(data) =>{
//           this.cards = [];
//           data.forEach((item) => {
//             let Card = item.payload.toJSON() as Icard
//             this.cards.push({
//               key : item.key || '',
//               title : Card.title ,
//               text: Card.text,
//               text2:Card.text2
//               }
//             )
//           })
//         }
//       })
// }
// }
// ამას ვუწერთ ექსპორტში
// implements OnInit
}