import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistrictsDashboardComponent } from './covid-data/districts/districts-dashboard/districts-dashboard.component';
import { NationalTrendComponent } from './covid-data/nation/national-trend/national-trend.component';
import { ProvincesDashboardComponent } from './covid-data/provinces/provinces-dashboard/provinces-dashboard.component';
import { ItalyComponent } from './italy.component';
import { ItalianVaccinationDashboardComponent } from '../vaccination/italian-vaccination/vaccination-dashboard/italian-vaccination-dashboard.component';



export const routes: Routes = [
  {
    path: 'italy',
    component: ItalyComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: NationalTrendComponent,
        data: {
          codivData: true,
          label: 'Italia'
        }
      },
      {
        path: 'districts',
        component: DistrictsDashboardComponent,
        data: {
          codivData: true,
          label: 'Regioni'
        }
      },
      {
        path: 'provinces',
        component: ProvincesDashboardComponent,
        data: {
          codivData: true,
          label: 'Province'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ItalyRoutingModule { }
