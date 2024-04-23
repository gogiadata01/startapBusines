import { Routes } from '@angular/router';
import {createComponent} from "@angular/core";
import {FormsComponent} from "./pages/forms/forms.component";
import {FormcComponent} from "./pages/formc/formc.component";

export const routes: Routes = [
  {
    path : "",
    component:FormcComponent
  }
  // {
  //   path:"CreateForm",
  //   component:FormcComponent
  // }
];
