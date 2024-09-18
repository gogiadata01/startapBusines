import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';
//@ts-ignore
import Swal from 'sweetalert2'


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule,
  NgIf, RouterLink,],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

}
