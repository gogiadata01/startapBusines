import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LogInComponent } from './pages/log-in/log-in.component';

export const routes: Routes = [
    {
        path:"", 
        component:RegisterComponent
    },
    {
        path:"LogIn",
        component:LogInComponent
    }
];
