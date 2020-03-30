import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ToggleButtonsComponent } from './components/toggle-buttons/toggle-buttons.component';
import { FormsModule } from '@angular/forms';
import { AsColorPipe } from './pipes/as-color.pipe';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartLegendComponent } from './components/line-chart-legend/line-chart-legend.component';
import { LineChartStrokeComponent } from './components/line-chart-stroke/line-chart-stroke.component';
import { DateStringPipe } from './pipes/date-string.pipe';
import { SignedNumberPipe } from './pipes/signed-number.pipe';
import { SignedPercentagePipe } from './pipes/signed-percentage.pipe';
import { ChipComponent } from './components/chip/chip.component';



@NgModule({
  declarations: [ToggleButtonsComponent, AsColorPipe, LineChartComponent, LineChartLegendComponent,
    LineChartStrokeComponent, DateStringPipe, SignedNumberPipe, SignedPercentagePipe, ChipComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    MaterialModule
  ],
  providers: [
    DateStringPipe
  ],
  exports: [ToggleButtonsComponent, AsColorPipe, LineChartComponent, DateStringPipe, SignedNumberPipe, SignedPercentagePipe, ChipComponent]
})
export class CommonComponentsModule { }
