import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {AngularFireModule} from "@angular/fire/";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFirestoreModule} from ""



import { routes } from './app.routes';
import {firebaseConfig} from "./core/constans/constants";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom([AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFirestoreModule
    ]) ]
};