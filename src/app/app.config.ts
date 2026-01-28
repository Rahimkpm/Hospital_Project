import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { HttpClient } from '@angular/common/http';
import { spinnerInterceptor } from './spinner.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,withHashLocation()),HttpClient,
    provideHttpClient(withInterceptors([spinnerInterceptor])),provideAnimations(), provideToastr()
    ],
};
