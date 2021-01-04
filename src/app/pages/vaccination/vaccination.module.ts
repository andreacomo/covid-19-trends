import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';
import { VaccinationDashboardComponent } from './vaccination-dashboard/vaccination-dashboard.component';
import { DistrictsStatusChartComponent } from './vaccination-dashboard/districts-status-chart/districts-status-chart.component';



@NgModule({
  declarations: [VaccinationDashboardComponent, DistrictsStatusChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule,
    CommonComponentsModule
  ]
})
export class VaccinationModule { }
