import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { CommonComponentsModule } from 'src/app/commons/common-components.module';
import { ChartsModule } from 'ng2-charts';
import { NationalTrendComponent } from './national-trend/national-trend.component';
import { NationalDataChartComponent } from './national-trend/national-data-chart/national-data-chart.component';
import { NationalDataTimeSelectorComponent } from './national-trend/national-data-time-selector/national-data-time-selector.component';


@NgModule({
  declarations: [NationalTrendComponent, NationalDataChartComponent, NationalDataTimeSelectorComponent],
  imports: [
    MaterialModule,
    CommonComponentsModule,
    ChartsModule,
    CommonModule
  ]
})
export class NationModule { }
