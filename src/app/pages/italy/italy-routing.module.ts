import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistrictsDashboardComponent } from '../districts/districts-dashboard/districts-dashboard.component';
import { NationalTrendComponent } from '../nation/national-trend/national-trend.component';
import { ProvincesDashboardComponent } from '../provinces/provinces-dashboard/provinces-dashboard.component';
import { ItalyComponent } from './italy.component';



export const routes: Routes = [
  {
    path: 'italy',
    component: ItalyComponent,
    children: [
      {
        path: 'overview',
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
