import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Province } from 'src/app/commons/models/province';
import { ProvinceData } from '../models/province-data';
import { GroupData } from '../models/group-data';
import { DistrictData } from '../models/district-data';
import { RemoteDataService } from './remote-data.service';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private readonly BASE_PATH = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/';

  private readonly ALL_PROVINCES_DATA = 'dpc-covid19-ita-province.json';

  private readonly ALL_DISTRICTS_DATA = 'dpc-covid19-ita-regioni.json';

  private readonly LATEST_PROVINCES_DATA = 'dpc-covid19-ita-province-latest.json';

  private readonly LATEST_DISTRICTS_DATA = 'dpc-covid19-ita-regioni-latest.json';

  constructor(private remote: RemoteDataService) { }

  getDistricts(): Observable<DistrictData[]> {
    return this.remote.getLatestData<DistrictData>(this.BASE_PATH + this.LATEST_DISTRICTS_DATA);
  }

  getProvincesOf(district: string): Observable<Province[]> {
    return this.remote.getLatestData<ProvinceData>(this.BASE_PATH + this.LATEST_PROVINCES_DATA)
      .pipe(
        map(parsed => {
          return parsed
            .filter(p => p.denominazione_regione === district && p.sigla_provincia)
            .map(d => {
              return {
                code: d.sigla_provincia,
                name: d.denominazione_provincia,
                cases: d.totale_casi
              };
            });
        })
      );
  }

  getAllDataInDistrict(district: string): Observable<GroupData<ProvinceData>> {
    return this.remote.getAllData<ProvinceData>(this.BASE_PATH + this.ALL_PROVINCES_DATA)
      .pipe(
        map(data => {
          return data
                    .filter(d => d.denominazione_regione === district)
                    .reduce((acc, i) => {
                      const group = acc[i.sigla_provincia] || [];
                      group.push(i);
                      acc[i.sigla_provincia] = group;
                      return acc;
                    }, {}) as GroupData<ProvinceData>;
        })
      );
  }

  getAllDistrictsData(): Observable<GroupData<DistrictData>> {
    return this.remote.getAllData<DistrictData>(this.BASE_PATH + this.ALL_DISTRICTS_DATA)
      .pipe(
        map(data => {
          return data
                    .reduce((acc, i) => {
                      const group = acc[i.denominazione_regione] || [];
                      group.push(i);
                      acc[i.denominazione_regione] = group;
                      return acc;
                    }, {}) as GroupData<DistrictData>;
        })
      );
  }
}
