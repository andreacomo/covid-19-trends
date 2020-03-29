import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { DistrictLatestTrendComponent } from './home-dashboard/district-latest-trend/district-latest-trend.component';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { DistrictLatestTableComponent } from './home-dashboard/district-latest-table/district-latest-table.component';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';
import { NationalLatestComponent } from './home-dashboard/national-latest/national-latest.component';
import { DistrictLatestProviderService } from './services/district-latest-provider.service';



@NgModule({
  declarations: [HomeDashboardComponent, DistrictLatestTrendComponent, DistrictLatestTableComponent, NationalLatestComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CommonComponentsModule,
    ChartsModule
  ],
  providers: [
    DistrictLatestProviderService
  ]
})
export class HomeModule { }
