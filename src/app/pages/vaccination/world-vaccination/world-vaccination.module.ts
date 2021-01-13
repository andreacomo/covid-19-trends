import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldVaccinationDashboardComponent } from './world-vaccination-dashboard/world-vaccination-dashboard.component';
import { CountriesStatusChartComponent } from './world-vaccination-dashboard/countries-status-chart/countries-status-chart.component';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';
import { ChartsModule } from 'ng2-charts';
import { CountriesTopStatusChartComponent } from './world-vaccination-dashboard/countries-top-status-chart/countries-top-status-chart.component';



@NgModule({
  declarations: [WorldVaccinationDashboardComponent, CountriesStatusChartComponent, CountriesTopStatusChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule,
    CommonComponentsModule
  ]
})
export class WorldVaccinationModule { }
