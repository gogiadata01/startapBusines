import { Component,OnDestroy,OnInit,inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-changepassword-email',
  standalone: true,
  imports: [ReactiveFormsModule,
    NgIf, RouterLink,],
  templateUrl: './changepassword-email.component.html',
  styleUrl: './changepassword-email.component.scss'
})
export class ChangepasswordEmailComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router)
  errormassage: string| null = null 
  route = inject(ActivatedRoute)
  sub$ = new Subject()
  // oobCode:string|null =null

  Form = this.fb.nonNullable.group({
    password: new FormControl("", [Validators.required]),
    oobCode: new FormControl("", [Validators.required])

  }) 
  ngOnInit(): void {
    this.route.queryParams
    .pipe(
      takeUntil(this.sub$)
    ).subscribe(params => {
      // if(params['oobCode' ]){
      //   console.log('oobCode' , params['oobCode'])
      //   // this.oobCode = params['oobCode']
      //   this.Form.patchValue({obbCode:params['oobCode']})
      // }
      if (params['oobCode']) {
        console.log('oobCode', params['oobCode']);
        this.Form.patchValue({oobCode:params['oobCode'] });
      }
    })
  }

  Submit(){
    const {oobCode, password} = this.Form.value as {password:string,oobCode:string}

    const rawForm = this.Form.getRawValue();
    this.authService.passwordreset(password,oobCode).subscribe({
      next: ()=>{
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        this.errormassage = err.code;
      }
    })
  }
  // ngOnDestroy(): void {
  //   this.sub$.next(null),
  //   this.sub$.complete()
  // }
}
