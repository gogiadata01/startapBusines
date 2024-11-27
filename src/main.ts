/// 

// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';
// import { importProvidersFrom } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(
//       BrowserModule,
//       HttpClientModule,
//       ReactiveFormsModule,
//       RouterModule.forRoot([]) // Add your routes here
//     ),
//     ...appConfig.providers
//   ]
// }).catch(err => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import {} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule, // Import ReactiveFormsModule here
      RouterModule.forRoot([]) // Add your routes here
    ),
    ...appConfig.providers
  ]
}).catch(err => console.error(err));



