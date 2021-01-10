import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItalianVaccinationDashboardComponent } from './italian-vaccination/vaccination-dashboard/italian-vaccination-dashboard.component';
import { VaccinationComponent } from './vaccination.component';



export const routes: Routes = [
  {
    path: 'vaccination',
    component: VaccinationComponent,
    children: [
      {
        path: '',
        redirectTo: 'italy',
        pathMatch: 'full'
      },
      {
        path: 'italy',
        component: ItalianVaccinationDashboardComponent,
        data: {
          label: 'Italia'
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
export class VaccinationRoutingModule { }
