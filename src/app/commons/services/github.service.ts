import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProvinceData } from '../models/province-data';
import { DistrictData } from '../models/district-data';
import { RemoteDataService } from './remote-data.service';
import { Colors } from '../models/colors';
import { HasColor } from '../models/has-color';

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

  private static addSingleColor<T extends HasColor>(data: T, colorIndex: number): T {
    data.color = Colors.SUPPORTED[colorIndex];
    return data;
  }

  getDistricts(): Observable<DistrictData[]> {
    return this.remote.getLatestData<DistrictData>(this.BASE_PATH + this.LATEST_DISTRICTS_DATA)
              .pipe(
                map(data => {
                  let index = -1;
                  return data
                    .map(d => {
                      return {...d}; // cloning objects to avoid dirty data
                    })
                    .map(d => GithubService.addSingleColor(d, ++index));
                })
              );
  }

  getProvincesOf(district: string): Observable<ProvinceData[]> {
    return this.remote.getLatestData<ProvinceData>(this.BASE_PATH + this.LATEST_PROVINCES_DATA)
      .pipe(
        map(parsed => {
          let index = -1;
          return parsed
            .filter(p => p.denominazione_regione === district && p.sigla_provincia)
            .map(d => GithubService.addSingleColor(d, ++index));
        })
      );
  }

  getAllDataInDistrict(district: string): Observable<{[code: string]: ProvinceData[]}> {
    return this.remote.getAllData<ProvinceData>(this.BASE_PATH + this.ALL_PROVINCES_DATA)
      .pipe(
        map(data => {
          const result = data
                    .filter(d => d.denominazione_regione === district)
                    .reduce((acc, i) => this.groupByAttribute<ProvinceData>(acc, i, 'sigla_provincia'), {});

          this.addColorToEntries<ProvinceData>(result);

          return result;
        })
      );
  }

  getAllDistrictsData(): Observable<{[name: string]: DistrictData[]}> {
    return this.remote.getAllData<DistrictData>(this.BASE_PATH + this.ALL_DISTRICTS_DATA)
      .pipe(
        map(data => {
          const result = data
                    .reduce((acc, i) => this.groupByAttribute<DistrictData>(acc, i, 'denominazione_regione'), {});

          this.addColorToEntries<DistrictData>(result);

          return result;
        })
      );
  }

  private addColorToEntries<T extends HasColor>(result: {[code: string]: T[]}) {
    let index = -1;
    Object.entries(result)
      .forEach(([code, values]) => {
        ++index;
        (values as T[]).map(v => GithubService.addSingleColor<T>(v, index));
      });
  }

  private groupByAttribute<T>(acc: {}, i: T, attribute: string) {
    const group = acc[i[attribute]] || [];
    group.push(i);
    acc[i[attribute]] = group;
    return acc;
  }
}
