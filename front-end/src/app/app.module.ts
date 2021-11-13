import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './modules/main/components/header/header.component';
import { MenuComponent } from './modules/main/components/menu/menu.component';
import { ButtonsComponent } from './modules/main/components/buttons/buttons.component';
import { LoginComponent } from './modules/main/components/login/login.component';
import { SignupComponent } from './modules/main/components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { CookieService } from 'ngx-cookie-service';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    ButtonsComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
