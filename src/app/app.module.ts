import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './commons/material/material.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ItalyModule } from './pages/italy/italy.module';
import { VaccinationModule } from './pages/vaccination/vaccination.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomeModule,
    ItalyModule,
    VaccinationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeIt, 'it');
