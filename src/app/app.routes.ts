import { Routes } from '@angular/router';
import {createComponent} from "@angular/core";
import {FormsComponent} from "./pages/add-Faculty-card/forms.component";
import {AddUniCardComponent,} from "./pages/Add-Uni-Card/add-uni-card.component";
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { ChangepasswordEmailComponent } from './pages/changepassword-email/changepassword-email.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StudentsComponent } from './pages/students/students.component';
import { PupilEventsPageComponent } from './pages/pupil-events-page/pupil-events-page.component';
import { PupilEventsAddPageComponent } from './pages/pupil-events-add-page/pupil-events-add-page.component';
import { PupilUniPageComponent } from './pages/pupil-uni-page/pupil-uni-page.component';
import { UniDetailsComponent } from './pages/uni-details/uni-details.component';
import { UniEventsComponent } from './pages/uni-events/uni-events.component';
import { FacultiDetailsComponent } from './pages/faculti-details/faculti-details.component';
import { AddHomeUniCardComponent } from './pages/add-home-uni-card/add-home-uni-card.component';
import { HomeUniCardComponent } from './pages/home-uni-card/home-uni-card.component';
import { HomeUniDetailsComponent } from './pages/home-uni-details/home-uni-details.component';
import { UniProgramPageComponent } from './pages/uni-program-page/uni-program-page.component';
import { AddHomeFacultyCardComponent } from './pages/add-home-faculty-card/add-home-faculty-card.component';
import { HomeFacultyDetailsComponent } from './pages/home-faculty-details/home-faculty-details.component';
import {  PupilComponent} from './pages/pupil-home/pupil.component';
import { HomeUniCardsProgramPageComponent } from './pages/home-uni-cards-program-page/home-uni-cards-program-page.component';
import { UniProgramsComponent } from './pages/uni-programs/uni-programs.component';
import { HomeFacultyUniDetailsComponent } from './pages/home-faculty-uni-details/home-faculty-uni-details.component';
import { UniFacultyDetailsComponent } from './pages/uni-faculty-details/uni-faculty-details.component';
import { FacultyUniDetailsComponent } from './pages/faculty-uni-details/faculty-uni-details.component';
import { AddWithApiHomeUniCardComponent } from './pages/add-with-api-uni-card/add-with-api-home-uni-card.component';
import { AddWithApiProgramCardComponent } from './pages/add-with-api-program-card/add-with-api-program-card.component';
import { AddWithApiEventCardComponent } from './pages/add-with-api-event-card/add-with-api-event-card.component';
import { RegisterWithApiComponent } from './pages/register-with-api/register-with-api.component';
import { SignUpWithApiComponent } from './pages/sign-up-with-api/sign-up-with-api.component';

export const routes: Routes = [
  {
    path : "",
    component:LogInComponent
  },
  {
    path:"Register",
    component:RegisterComponent
  },
  {
    path:"Home",
    component:NavbarComponent,
  },
  {
    path:"Home/AddUniCard",
    component:AddUniCardComponent
  },
  {
    path:"Home/AddHomeUniCard",
    component:AddHomeUniCardComponent
  },
  {
    path:"Home/AddHomeUniCardWithApi",
    component:AddWithApiHomeUniCardComponent
  },
  {
    path:"Home/AddProgramCardWithApi",
    component:AddWithApiProgramCardComponent
  },
  {
    path:"Home/AddEventCardWithApi",
    component:AddWithApiEventCardComponent
  },
  {
    path:"Home/AddUniFacultyCard",
    component:FormsComponent
  },
  {
    path:"Home/AddHomeUniFacultyCard",
    component:AddHomeFacultyCardComponent
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
    path:"Pupil/Uni",
    component:PupilUniPageComponent
  },
  {
    path:"Pupil/Uni/:id",
    component:UniDetailsComponent
  },
  {
    path:"Pupil/Uni/:id/:n",
    component:UniFacultyDetailsComponent
  },
  {
    path:"Pupil/UniFaculty",
    component:UniProgramPageComponent
  },
  {
    path:"Pupil/UniFaculty/:id/:n",
    component:FacultiDetailsComponent
  },
  {
    path:"Pupil/UniFaculty/:id/:n/:id2/:n2",
    component:FacultyUniDetailsComponent
  },
  {
    path: "Pupil/Events",
    component:PupilEventsPageComponent
  },
  {
   path:"Pupil/HomeUni/:id",
    component:HomeUniDetailsComponent
  },
  {
    path:"Pupil/HomeUni/:id/:n",
     component:UniProgramsComponent
   },
  {
    path:"Pupil/HomeUniFaculty/:id/:n",
    component:HomeFacultyDetailsComponent
  },
  {
    path:"Pupil/HomeUniFaculty/:id/:n/:id2/:n2",
    component:HomeFacultyUniDetailsComponent
  }
];
