import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),data:{title:'CURE'} },
  { path: '404', component: PagenotfoundComponent, data: { title: '404' } },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
