import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default/default.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AuthGuard } from './guards/auth-guard';

export const AppRoutes: Routes = [
    
    //Site routes goes here 
    { 
        path: '', 
        component: DefaultLayoutComponent,
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard], data:{roles: ['Admin']} },
          { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] }
        //   { path: 'about', component: AboutComponent },
        //   { path: 'test/:id', component: AboutComponent }
        ]
    },
    
    // App routes goes here here
    // { 
    //     path: '',
    //     component: AppLayoutComponent, 
    //     children: [
    //       { path: 'dashboard', component: DashboardComponent },
    //       { path: 'profile', component: ProfileComponent }
    //     ]
    // },

    //no layout routes
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    //{ path: 'register', children: [{path: '',component: RegisterComponent}] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];