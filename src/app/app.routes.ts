import { Routes } from '@angular/router';
import {createComponent} from "@angular/core";
import { LogInComponent } from './pages/log-in/log-in.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StudentsComponent } from './pages/students/students.component';
import { PupilEventsPageComponent } from './pages/pupil-events-page/pupil-events-page.component';
import { PupilEventsAddPageComponent } from './pages/pupil-events-add-page/pupil-events-add-page.component';
import { PupilUniPageComponent } from './pages/pupil-uni-page/pupil-uni-page.component';
import { UniDetailsComponent } from './pages/uni-details/uni-details.component';
import { UniEventsComponent } from './pages/uni-events/uni-events.component';
import { FacultiDetailsComponent } from './pages/faculti-details/faculti-details.component';
import { HomeUniCardComponent } from './pages/home-uni-card/home-uni-card.component';
import { HomeUniDetailsComponent } from './pages/home-uni-details/home-uni-details.component';
import { UniProgramPageComponent } from './pages/uni-program-page/uni-program-page.component';
import {  PupilComponent} from './pages/pupil-home/pupil.component';
import { UniFacultyDetailsComponent } from './pages/uni-faculty-details/uni-faculty-details.component';
import { FacultyUniDetailsComponent } from './pages/faculty-uni-details/faculty-uni-details.component';
import { AddWithApiHomeUniCardComponent } from './pages/add-with-api-uni-card/add-with-api-home-uni-card.component';
import { AddWithApiProgramCardComponent } from './pages/add-with-api-program-card/add-with-api-program-card.component';
import { AddWithApiEventCardComponent } from './pages/add-with-api-event-card/add-with-api-event-card.component';
import { RegisterWithApiComponent } from './pages/register-with-api/register-with-api.component';
import { SignUpWithApiComponent } from './pages/sign-up-with-api/sign-up-with-api.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { HomeComponent } from './pages/home/home.component';
import { AddQuizWithApiComponent } from './pages/add-quiz-with-api/add-quiz-with-api.component';
import { UniProgramComponent } from './core/UniProgram/uni-program.component';
import { QuizeComponent } from './pages/quize/quize.component';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';

export const routes: Routes = [
  {
    path : "",
    component: HomeComponent
  },
  // {
  //   path : "",
  //   component: PersonalPageComponent
  // },
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
    path:"Pupil/UniFaculty/:n",
    component:FacultiDetailsComponent
  },
  {
    path:"Pupil/UniFaculty/:n/:id2/:n2",
    component:FacultyUniDetailsComponent
  },
  {
    path: "Pupil/Events",
    component:PupilEventsPageComponent
  },
  {
    path: "Pupil/Events/:id",
    component:EventDetailsComponent
  },
  {
   path:"Pupil/HomeUni/:id",
    component:HomeUniDetailsComponent
  },
  {path:"Pupil/HomeUni/:id/:n",
  component:UniFacultyDetailsComponent
  },
  {
    path:"Pupil/Quize",
    component:QuizeComponent
  },
  {
    path:"Register",
    component:RegisterWithApiComponent
  },
  {
    path:"SignUp",
    component:SignUpWithApiComponent
  },
  {
    path:"Home/:id",
    component:NavbarComponent,
  },
  {
    path:"Home/:id/AddHomeUniCardWithApi",
    component:AddWithApiHomeUniCardComponent
  },
  {
    path:"Home/AddProgramCardWithApi",
    component:AddWithApiProgramCardComponent
  },
  {
    path:"Home/AddQuizWithApi",
    component:AddQuizWithApiComponent
  },
  {
    path:"Home/AddEventCardWithApi",
    component:AddWithApiEventCardComponent
  },
  {
    path:"Home/AddEventCard",
    component:PupilEventsAddPageComponent
  },
  {
    path:"Admin",
    component:AdminComponent
  },
  {
    path:"Students",
    component:StudentsComponent
  },

];
