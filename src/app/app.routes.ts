import { Routes } from '@angular/router';
import {createComponent} from "@angular/core";
import {FormsComponent} from "./pages/forms/forms.component";
import {FormcComponent} from "./pages/formc/formc.component";
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { ChangepasswordEmailComponent } from './pages/changepassword-email/changepassword-email.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StudentsComponent } from './pages/students/students.component';
import { PupilComponent } from './pages/pupil/pupil.component';
import { UniFacultyComponent } from './pages/uni-faculty/uni-faculty.component';
import { PupilEventsPageComponent } from './pages/pupil-events-page/pupil-events-page.component';
import { PupilEventsAddPageComponent } from './pages/pupil-events-add-page/pupil-events-add-page.component';


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
    component:NavbarComponent,
  },
  {
    path:"Home/AddHomeUniCard",
    component:FormcComponent
  },
  {
    path:"Home/AddUniFacultyCard",
    component:FormsComponent
  },
  {
    path:"Home/AddEventCard",
    component:PupilEventsAddPageComponent
  },
  {
    path:"Recovery-password",
    component:RecoveryPasswordComponent
  },
  {
    path:"Password-recovery",
    component:ChangepasswordEmailComponent
  },
  {
    path:"Admin",
    component:AdminComponent
  },
  {
    path:"Students",
    component:StudentsComponent
  },
  {
    path:"Pupil",
    component:PupilComponent
  },
  {
    path:"Pupil/UniFaculty",
    component:UniFacultyComponent
  },
  {
    path: "Pupil/Events",
    component:PupilEventsPageComponent
  }


];
