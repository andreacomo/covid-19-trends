import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeDashboardComponent } from './pages/home/home-dashboard/home-dashboard.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeDashboardComponent,
    data: {
      label: 'Home',
      title: 'Covid 19 Trends - Panoramica Generale Italiana'
    }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
