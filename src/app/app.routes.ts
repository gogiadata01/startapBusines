import { Routes } from '@angular/router';
import {createComponent} from "@angular/core";
import {FormsComponent} from "./pages/forms/forms.component";
import {FormcComponent} from "./pages/formc/formc.component";
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { ChangepasswordEmailComponent } from './pages/changepassword-email/changepassword-email.component';

export const routes: Routes = [
  {
    path : "",
    component:LogInComponent
  },
  // {
  //   path:"CreateForm",
  //   component:FormcComponent
  // }
  {
    path:"Register",
    component:RegisterComponent
  },
  {
    path:"Home",
    component:NavbarComponent
  },{
    path:"Recovery-password",
    component:RecoveryPasswordComponent
  },
  {
    path:"Password-recovery",
    component:ChangepasswordEmailComponent
  }
];
