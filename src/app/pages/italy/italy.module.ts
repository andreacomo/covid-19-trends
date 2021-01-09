import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItalyComponent } from './italy.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/commons/material/material.module';
import { ItalyRoutingModule } from './italy-routing.module';



@NgModule({
  declarations: [
    ItalyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ItalyRoutingModule
  ]
})
export class ItalyModule { }
