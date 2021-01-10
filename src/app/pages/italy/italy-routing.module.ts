import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistrictsDashboardComponent } from './covid-data/districts/districts-dashboard/districts-dashboard.component';
import { NationalTrendComponent } from './covid-data/nation/national-trend/national-trend.component';
import { ProvincesDashboardComponent } from './covid-data/provinces/provinces-dashboard/provinces-dashboard.component';
import { ItalyComponent } from './italy.component';
import { VaccinationDashboardComponent } from './vaccination/vaccination-dashboard/vaccination-dashboard.component';



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
  },
  {
    path: 'vaccination',
    component: VaccinationDashboardComponent,
    data: {
      label: 'Vaccinazioni'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ItalyRoutingModule { }
