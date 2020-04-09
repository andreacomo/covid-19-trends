import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvincesDashboardComponent } from './pages/provinces/provinces-dashboard/provinces-dashboard.component';
import { DistrictsDashboardComponent } from './pages/districts/districts-dashboard/districts-dashboard.component';
import { HomeDashboardComponent } from './pages/home/home-dashboard/home-dashboard.component';
import { NationalTrendComponent } from './pages/nation/national-trend/national-trend.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeDashboardComponent,
    data: {
      label: 'Home'
    }
  },
  {
    path: 'italy',
    component: NationalTrendComponent,
    data: {
      label: 'Italia'
    }
  },
  {
    path: 'districts',
    component: DistrictsDashboardComponent,
    data: {
      label: 'Regioni'
    }
  },
  {
    path: 'provinces',
    component: ProvincesDashboardComponent,
    data: {
      label: 'Province'
    }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
