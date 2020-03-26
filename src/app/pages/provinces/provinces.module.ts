import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvincesDashboardComponent } from './provinces-dashboard/provinces-dashboard.component';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { DistrictComponent } from './provinces-dashboard/district/district.component';
import { ProvincesComponent } from './provinces-dashboard/provinces/provinces.component';
import { ProvincesChartComponent } from './provinces-dashboard/provinces-chart/provinces-chart.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';


@NgModule({
  declarations: [ProvincesDashboardComponent, DistrictComponent, ProvincesComponent, ProvincesChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule,
    FormsModule,
    CommonComponentsModule
  ]
})
export class ProvincesModule { }
