import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { AuthService } from 'app/shared/auth/auth.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'comingsoon',
        component: ComingSoonPageComponent,
        data: {
          title: 'Page à venir'
        }
      },
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: "Page d'erreur"
        }
      },
      {
        path: 'changepassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Page Mot de passe oublié'
        },
        canActivate:[AuthGuard]
      },   
      
      {
        path: 'lockscreen',
        component: LockScreenPageComponent,
        data: {
          title: 'Lock Screen page'
        }
      },   
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Page de connexion'
        },
        
        
      },
      {
        path: 'maintenance',
        component: MaintenancePageComponent,
        data: {
          title: 'Page de maintenance'
        }
      },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
