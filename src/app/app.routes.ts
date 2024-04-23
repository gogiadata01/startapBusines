import { Routes } from '@angular/router';
import {createComponent} from "@angular/core";
import {FormsComponent} from "./pages/forms/forms.component";
import {FormcComponent} from "./pages/formc/formc.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";

export const routes: Routes = [
  {
    path : "",
    component:HomePageComponent
  }
  // {
  //   path:"CreateForm/id",
  //   component:CreateFormComponent
  // }
];
