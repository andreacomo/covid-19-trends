import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';
import { ItalianVaccinationDashboardComponent } from './vaccination-dashboard/italian-vaccination-dashboard.component';
import { DistrictsStatusChartComponent } from './vaccination-dashboard/districts-status-chart/districts-status-chart.component';
import { DistrictStatusChartTypeSelectorComponent } from './vaccination-dashboard/districts-status-chart/district-status-chart-type-selector/district-status-chart-type-selector.component';
import { OverallStatusChartComponent } from './vaccination-dashboard/overall-status-chart/overall-status-chart.component';
import { OverallStatusCardComponent } from './vaccination-dashboard/overall-status-card/overall-status-card.component';
import { AgeGroupsChartComponent } from './vaccination-dashboard/age-groups-chart/age-groups-chart.component';
import { CategoryGroupsChartComponent } from './vaccination-dashboard/category-groups-chart/category-groups-chart.component';
import { VaccinesBrandDeliveryChartComponent } from './vaccination-dashboard/vaccines-brand-delivery-chart/vaccines-brand-delivery-chart.component';
import { PeopleCoverageStatusCardComponent } from './vaccination-dashboard/people-coverage-status-card/people-coverage-status-card.component';
import { VaccinesDeliveryDateChartComponent } from './vaccination-dashboard/vaccines-delivery-date-chart/vaccines-delivery-date-chart.component';



@NgModule({
  declarations: [ItalianVaccinationDashboardComponent, DistrictsStatusChartComponent,
    DistrictStatusChartTypeSelectorComponent, OverallStatusChartComponent,
    OverallStatusCardComponent, AgeGroupsChartComponent, CategoryGroupsChartComponent,
    VaccinesBrandDeliveryChartComponent, PeopleCoverageStatusCardComponent, VaccinesDeliveryDateChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule,
    CommonComponentsModule
  ]
})
export class ItalianVaccinationModule { }
