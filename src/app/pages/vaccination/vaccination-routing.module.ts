import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItalianVaccinationDashboardComponent } from './italian-vaccination/vaccination-dashboard/italian-vaccination-dashboard.component';
import { OverviewPanelComponent } from './italian-vaccination/vaccination-dashboard/overview-panel/overview-panel.component';
import { VaccinationComponent } from './vaccination.component';
import { WorldVaccinationDashboardComponent } from './world-vaccination/world-vaccination-dashboard/world-vaccination-dashboard.component';



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
        },
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full'
          },
          {
            path: 'overview',
            component: OverviewPanelComponent,
            data: {
              label: 'Panoramica'
            }
          }
        ]
      },
      {
        path: 'world',
        component: WorldVaccinationDashboardComponent,
        data: {
          label: 'Resto del mondo'
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
