import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItalyComponent } from './italy.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { ItalyRoutingModule } from './italy-routing.module';
import { VaccinationModule } from './vaccination/vaccination.module';
import { NationModule } from './covid-data/nation/nation.module';
import { ProvincesModule } from './covid-data/provinces/provinces.module';
import { DistrictsModule } from './covid-data/districts/districts.module';



@NgModule({
  declarations: [
    ItalyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ItalyRoutingModule,
    NationModule,
    ProvincesModule,
    DistrictsModule,
    VaccinationModule
  ]
})
export class ItalyModule { }
