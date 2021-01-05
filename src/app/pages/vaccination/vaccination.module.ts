import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';
import { VaccinationDashboardComponent } from './vaccination-dashboard/vaccination-dashboard.component';
import { DistrictsStatusChartComponent } from './vaccination-dashboard/districts-status-chart/districts-status-chart.component';
import { DistrictStatusChartTypeSelectorComponent } from './vaccination-dashboard/districts-status-chart/district-status-chart-type-selector/district-status-chart-type-selector.component';
import { OverallStatusChartComponent } from './vaccination-dashboard/overall-status-chart/overall-status-chart.component';
import { OverallStatusCardComponent } from './vaccination-dashboard/overall-status-card/overall-status-card.component';



@NgModule({
  declarations: [VaccinationDashboardComponent, DistrictsStatusChartComponent, DistrictStatusChartTypeSelectorComponent, OverallStatusChartComponent, OverallStatusCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule,
    CommonComponentsModule
  ]
})
export class VaccinationModule { }
