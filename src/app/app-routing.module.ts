import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeDashboardComponent } from './pages/home/home-dashboard/home-dashboard.component';
import { VaccinationDashboardComponent } from './pages/vaccination/vaccination-dashboard/vaccination-dashboard.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeDashboardComponent,
    data: {
      label: 'Home'
    }
  },
  {
    path: 'vaccination',
    component: VaccinationDashboardComponent,
    data: {
      label: 'Vaccinazioni'
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
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
