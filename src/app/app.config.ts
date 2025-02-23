// import {ApplicationConfig,OnInit, importProvidersFrom} from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes,),

//     ]
//   };
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withEnabledBlockingInitialNavigation } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({ 
        scrollPositionRestoration: 'enabled', // scrolls to top on navigation
        anchorScrolling: 'enabled'            // enables anchor scrolling if needed
      })
    )
  ]
};
