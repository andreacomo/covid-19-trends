import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';
import { VaccinationDashboardComponent } from './vaccination-dashboard/vaccination-dashboard.component';
import { DistrictsStatusComponent } from './vaccination-dashboard/districts-status/districts-status.component';



@NgModule({
  declarations: [VaccinationDashboardComponent, DistrictsStatusComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule,
    CommonComponentsModule
  ]
})
export class VaccinationModule { }
