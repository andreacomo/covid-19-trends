import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';
import { ItalianVaccinationDashboardComponent } from './vaccination-dashboard/italian-vaccination-dashboard.component';
import { DistrictsStatusChartComponent } from './vaccination-dashboard/districts-panel/districts-status-chart/districts-status-chart.component';
import { DistrictStatusChartTypeSelectorComponent } from './vaccination-dashboard/districts-panel/districts-status-chart/district-status-chart-type-selector/district-status-chart-type-selector.component';
import { OverallStatusChartComponent } from './vaccination-dashboard/overview-panel/overall-status-chart/overall-status-chart.component';
import { OverallStatusCardComponent } from './vaccination-dashboard/overview-panel/overall-status-card/overall-status-card.component';
import { AgeGroupsChartComponent } from './vaccination-dashboard/overview-panel/age-groups-chart/age-groups-chart.component';
import { CategoryGroupsChartComponent } from './vaccination-dashboard/overview-panel/category-groups-chart/category-groups-chart.component';
import { VaccinesBrandDeliveryChartComponent } from './vaccination-dashboard/districts-panel/vaccines-brand-delivery-chart/vaccines-brand-delivery-chart.component';
import { PeopleCoverageStatusCardComponent } from './vaccination-dashboard/overview-panel/people-coverage-status-card/people-coverage-status-card.component';
import { VaccinesDeliveryDateChartComponent } from './vaccination-dashboard/overview-panel/vaccines-delivery-date-chart/vaccines-delivery-date-chart.component';
import { AdministrationDayByDayChartComponent } from './vaccination-dashboard/overview-panel/administration-day-by-day-chart/administration-day-by-day-chart.component';
import { OverviewPanelComponent } from './vaccination-dashboard/overview-panel/overview-panel.component';
import { RouterModule } from '@angular/router';
import { DistrictsPanelComponent } from './vaccination-dashboard/districts-panel/districts-panel.component';
import { VaccinationLastUpdateComponent } from './vaccination-dashboard/vaccination-last-update/vaccination-last-update.component';
import { DistrictsCategoryGroupsChartComponent } from './vaccination-dashboard/districts-panel/districts-category-groups-chart/districts-category-groups-chart.component';



@NgModule({
  declarations: [ItalianVaccinationDashboardComponent, DistrictsStatusChartComponent,
    DistrictStatusChartTypeSelectorComponent, OverallStatusChartComponent,
    OverallStatusCardComponent, AgeGroupsChartComponent, CategoryGroupsChartComponent,
    VaccinesBrandDeliveryChartComponent, PeopleCoverageStatusCardComponent, VaccinesDeliveryDateChartComponent,
    AdministrationDayByDayChartComponent,
    OverviewPanelComponent,
    DistrictsPanelComponent,
    VaccinationLastUpdateComponent,
    DistrictsCategoryGroupsChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule,
    RouterModule,
    CommonComponentsModule
  ]
})
export class ItalianVaccinationModule { }
