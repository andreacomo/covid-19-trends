import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ToggleButtonsComponent } from './components/toggle-buttons/toggle-buttons.component';
import { FormsModule } from '@angular/forms';
import { AsColorPipe } from './pipes/as-color.pipe';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [ToggleButtonsComponent, AsColorPipe, LineChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    MaterialModule
  ],
  exports: [ToggleButtonsComponent, AsColorPipe, LineChartComponent]
})
export class CommonComponentsModule { }
