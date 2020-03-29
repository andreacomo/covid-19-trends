import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { DistrictLatestTrendComponent } from './home-dashboard/district-latest-trend/district-latest-trend.component';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { DistrictLatestTableComponent } from './home-dashboard/district-latest-table/district-latest-table.component';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';



@NgModule({
  declarations: [HomeDashboardComponent, DistrictLatestTrendComponent, DistrictLatestTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CommonComponentsModule,
    ChartsModule
  ]
})
export class HomeModule { }
