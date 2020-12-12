import { Injectable } from '@angular/core';
import milestones from '../../data/milestones.json';
import provincesPop from '../../data/province_pop_2019.json';
import districtsLockdownColors from '../../data/districts-lockdown-colors.json';
import { Milestone } from '../models/milestone';
import { ProvincePopulation } from '../models/province-population';
import { Observable, of } from 'rxjs';
import { DistrictPopulation } from '../models/district-population';
import { DistrictsLockdownColors } from '../models/districts-lockdown-colors';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() { }

  getMilestones(): Observable<Milestone[]> {
    return of(milestones as Milestone[]);
  }

  getProvincesPopulation(): Observable<ProvincePopulation[]> {
    return of( provincesPop as ProvincePopulation[] );
  }

  getDistrictsPopulation(): Observable<DistrictPopulation[]> {
    const populationByDistrict = (provincesPop as ProvincePopulation[])
      .reduce((acc, prov) => {
        const districtName = this.districtCodeToNameAdapter(prov);
        const grouped = acc[districtName] || [];
        grouped.push(prov);
        acc[districtName] = grouped;
        return acc;
      }, {} as {[name: string]: ProvincePopulation[]});

    const districtPopulation: DistrictPopulation[] = Object.entries(populationByDistrict)
      .map(([districtName, population]) => {
        return {
          codice_regione: population[0].codice_regione,
          regione: districtName,
          popolazione: population.reduce((acc, p) => acc + p.popolazione, 0)
        };
      });

    return of(districtPopulation);
  }

  private districtCodeToNameAdapter(provincePop: ProvincePopulation): string {
    switch (provincePop.regione) {
      case 'ABR':
        return 'Abruzzo';
      case 'BAS':
        return 'Basilicata';
      case 'CAL':
        return 'Calabria';
      case 'CAM':
        return 'Campania';
      case 'EMR':
        return 'Emilia-Romagna';
      case 'FVG':
        return 'Friuli Venezia Giulia';
      case 'LAZ':
        return 'Lazio';
      case 'LIG':
        return 'Ligura';
      case 'LOM':
        return 'Lombardia';
      case 'MAR':
        return 'Marche';
      case 'MOL':
        return 'Molise';
      case 'PIE':
        return 'Piemonte';
      case 'TAA':
        switch (provincePop.sigla_provincia) {
          case 'TN':
            return 'P.A. Trento';
          case 'BZ':
            return 'P.A. Bolzano';
          default:
            throw new Error(`Unexpected province ${provincePop.sigla_provincia}`);
        }
      case 'PUG':
        return 'Puglia';
      case 'SAR':
        return 'Sardegna';
      case 'SIC':
        return 'Sicilia';
      case 'TOS':
        return 'Toscana';
      case 'UMB':
        return 'Umbria';
      case 'VEN':
        return 'Veneto';
      case 'VDA':
        return 'Valle d\'Aosta';
      default:
        throw new Error(`Unexpected district ${provincePop.regione}`);
    }
  }

  getDistrictsLockdownColors(): Observable<DistrictsLockdownColors> {
    return of(districtsLockdownColors as DistrictsLockdownColors);
  }
}
