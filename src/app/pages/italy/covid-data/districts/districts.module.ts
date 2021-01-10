import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { DistrictsDashboardComponent } from './districts-dashboard/districts-dashboard.component';
import { DistrictsComponent } from './districts-dashboard/districts/districts.component';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';
import { DistrictChartComponent } from './districts-dashboard/district-chart/district-chart.component';
import { ItalyModule } from '../../italy.module';



@NgModule({
  declarations: [DistrictsDashboardComponent, DistrictsComponent, DistrictChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule,
    FormsModule,
    CommonComponentsModule,
    ItalyModule
  ]
})
export class DistrictsModule { }
