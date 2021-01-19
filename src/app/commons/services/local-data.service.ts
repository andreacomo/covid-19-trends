import { Injectable } from '@angular/core';
import milestones from '../../data/milestones.json';
import provincesPop from '../../data/province_pop_2019.json';
import districtsLockdownColors from '../../data/districts-lockdown-colors.json';
import { Milestone } from '../models/milestone';
import { ProvincePopulation } from '../models/province-population';
import { Observable, of } from 'rxjs';
import { DistrictPopulation } from '../models/district-population';
import { DistrictsLockdownColors } from '../models/districts-lockdown-colors';
import { Districts } from '../models/districts';

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
    if (provincePop.regione === 'TAA') {
      switch (provincePop.sigla_provincia) {
        case 'TN':
          return 'P.A. Trento';
        case 'BZ':
          return 'P.A. Bolzano';
        default:
          throw new Error(`Unexpected province ${provincePop.sigla_provincia}`);
      }
    } else {
      return Districts.MAPPING[provincePop.regione];
    }
  }

  getDistrictsLockdownColors(): Observable<DistrictsLockdownColors> {
    return of(districtsLockdownColors as DistrictsLockdownColors);
  }
}
