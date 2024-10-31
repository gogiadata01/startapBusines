import {ApplicationConfig,OnInit, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore"
import {getAuth,provideAuth} from "@angular/fire/auth"
import {getFirestore,provideFirestore} from "@angular/fire/firestore"
import {SweetAlertArrayOptions} from 'sweetalert2'



import { routes } from './app.routes';
import {firebaseConfig} from "./core/constans/constants";
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,),

    ]
  };
