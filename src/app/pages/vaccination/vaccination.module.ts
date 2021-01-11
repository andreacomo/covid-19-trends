import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItalianVaccinationModule } from './italian-vaccination/italian-vaccination.module';
import { VaccinationComponent } from './vaccination.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { VaccinationRoutingModule } from './vaccination-routing.module';
import { WorldVaccinationModule } from './world-vaccination/world-vaccination.module';



@NgModule({
  declarations: [VaccinationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    VaccinationRoutingModule,
    ItalianVaccinationModule,
    WorldVaccinationModule
  ]
})
export class VaccinationModule { }
