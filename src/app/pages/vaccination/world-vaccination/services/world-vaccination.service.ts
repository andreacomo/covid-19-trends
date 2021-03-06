import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CachableRemoteDataService } from 'src/app/commons/services/cachable-remote-data.service';
import { CountryVaccinationStatus } from '../models/country-vaccination-status';
import { WorldVaccinationStatus } from '../models/world-vaccination-status';

@Injectable({
    providedIn: 'root'
  })
export class WorldVaccinationService {

    private url = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv';

    constructor(private remoteService: CachableRemoteDataService) { }

    public getWorldVaccination(): Observable<WorldVaccinationStatus[]> {
        return this.remoteService.getData<string>(this.url, {
                responseType: 'text'
            })
            .pipe(
                map(resp => this.parseCsv<CountryVaccinationStatus>(resp, (cells) => ({
                                countryName: cells[0],
                                countryIsoCode: cells[1],
                                date: cells[2],
                                totalVaccinations: parseInt(cells[3], 10) || null,
                                dailyVaccinations: parseInt(cells[7], 10) || null,
                                totalVaccinationsPerHundred: parseFloat(cells[8]) || null,
                                peopleFullyVaccinatedPerHundred: parseFloat(cells[10]) || null
                        })
                    )
                ),
                map(data => {
                    const groupByCountryName: {[code: string]: CountryVaccinationStatus[]} = data.reduce((acc, v) => {
                        acc[v.countryName] = acc[v.countryName] || [];
                        acc[v.countryName].push(v);
                        return acc;
                    }, {});
                    return Object.keys(groupByCountryName).map(group => ({
                        countryIsoCode: groupByCountryName[group][0].countryIsoCode,
                        countryName: group,
                        data: groupByCountryName[group].sort((v1, v2) => v1.date.localeCompare(v2.date))
                    } as WorldVaccinationStatus));
                })
        );
    }

    private parseCsv<T>(csv: string, transform: (cells: string[]) => T, delimiter = ',', skipRows = 1): T[] {
        const rows = csv.split(/\r\n|\n/);
        return rows.slice(skipRows).map(row => {
            const cells: string[] = row.split(delimiter);
            return transform(cells);
        });
    }
}
