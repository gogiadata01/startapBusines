import { Component,inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';
import {UserService} from '../../user.service'

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [ReactiveFormsModule,
    NgIf, RouterLink,],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export class RecoveryPasswordComponent {
  recoveryForm: FormGroup;
  message: string = '';

  constructor(
    private passwordRecoveryService: UserService,
    private fb: FormBuilder
  ) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      const email = this.recoveryForm.get('email')?.value;
      this.passwordRecoveryService.sendRecoveryLink(email).subscribe(
        (response) => {
          this.message = 'Password recovery link has been sent to your email.';
        },
        (error) => {
          this.message = 'There was an error sending the recovery link.';
        }
      );
    }
  }
}
