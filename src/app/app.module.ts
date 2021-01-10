import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProvincesModule } from './pages/italy/covid-data/provinces/provinces.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './commons/material/material.module';
import { FooterComponent } from './layout/footer/footer.component';
import { DistrictsModule } from './pages/italy/covid-data/districts/districts.module';
import { NationModule } from './pages/italy/covid-data/nation/nation.module';
import { VaccinationModule } from './pages/italy/vaccination/vaccination.module';
import { HomeModule } from './pages/home/home.module';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';

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
    ProvincesModule,
    DistrictsModule,
    NationModule,
    VaccinationModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeIt, 'it');
