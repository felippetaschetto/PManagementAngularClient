import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule, BrowserXhr } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { DefaultLayoutComponent } from './layouts/default/default.component';

import { HomeComponent } from './components/home/home.component';
import { AppRoutes } from './app-routing.module';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AuthGuard } from './guards/auth-guard';
import { TokenInterceptor } from './_http-interceptor/tokenInterceptor';
import { Globals } from './globals';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './services/notifications/notification.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,   
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,  // Required for Toast
    ToastrModule.forRoot() 
    
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    DefaultLayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent
  ],  
  providers: [
    AuthenticationService,
    Globals,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
