import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';
import { ChartsModule } from 'ng2-charts';
import { NationalTrendComponent } from './national-trend/national-trend.component';
import { NationalNewCasesChartComponent } from './national-trend/national-new-cases-chart/national-new-cases-chart.component';


@NgModule({
  declarations: [NationalTrendComponent, NationalNewCasesChartComponent],
  imports: [
    MaterialModule,
    CommonComponentsModule,
    ChartsModule,
    CommonModule
  ]
})
export class NationModule { }
