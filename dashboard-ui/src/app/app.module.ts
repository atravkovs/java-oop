import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { AuthModule } from './module/auth/auth.module';
import { AuthInterceptor } from './module/auth/interceptors/auth.interceptor';
import { Error404Component } from './layout/error404/error404.component';
import { ComparisonService } from './module/shared/comparison/comparison.service';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

function initializeLocalStorage(
  comparisonService: ComparisonService
): () => Promise<any> {
  return () =>
    new Promise((resolve) => {
      comparisonService.initialize();
      resolve(null);
    });
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, Error404Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLocalStorage,
      deps: [ComparisonService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
