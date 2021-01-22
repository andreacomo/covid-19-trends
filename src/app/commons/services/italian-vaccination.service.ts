import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { VaccinationDistrictStatus } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-district-status';
import { VaccinationDistrictOverallStatus } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-district-overall-status';
import { VaccinationAgeGroup } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-age-group';
import { VaccinationCategoryGroup } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-category-group';
import { Districts } from '../models/districts';

@Injectable({
    providedIn: 'root'
  })
export class ItalianVaccinationService {

    private readonly url = 'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/';

    private readonly LATEST_UPDATE = 'last-update-dataset.json';

    private readonly REGISTRY_SUMMARY = 'anagrafica-vaccini-summary-latest.json';

    private readonly VAX_SUMMARY = 'vaccini-summary-latest.json';

    private cache: Map<string, Observable<any>> = new Map<string, Observable<any>>();

    constructor(private http: HttpClient) { }

    public getLastUpdate(): Observable<Date> {
        return this.getRemoteOrCached(this.LATEST_UPDATE, 'lastUpdate', data => {
            return Date.parse(data.ultimo_aggiornamento);
        });
    }

    public getTotal(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, 'registrySummary', data => {
            return data.data;
        })
        .pipe(
            map((data: RegistrySummary[]) => this.sumAttributeValue(data, 'totale'))
        );
    }

    public getFirstDosesTotal(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, 'registrySummary', data => {
            return data.data;
        })
        .pipe(
            map((data: RegistrySummary[]) => this.sumAttributeValue(data, 'prima_dose'))
        );
    }

    public getSecondDosesTotal(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, 'registrySummary', data => {
            return data.data;
        })
        .pipe(
            map((data: RegistrySummary[]) => this.sumAttributeValue(data, 'seconda_dose'))
        );
    }

    public getTotalMen(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, 'registrySummary', data => {
            return data.data;
        })
        .pipe(
            map((data: RegistrySummary[]) => this.sumAttributeValue(data, 'sesso_maschile'))
        );
    }

    public getTotalWomen(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, 'registrySummary', data => {
            return data.data;
        })
        .pipe(
            map((data: RegistrySummary[]) => this.sumAttributeValue(data, 'sesso_femminile'))
        );
    }

    public getVaccinationDistrictsStatus(): Observable<VaccinationDistrictOverallStatus> {
        return this.getRemoteOrCached(this.VAX_SUMMARY, 'districtsStatus', data => {
            const doneCount: number = this.sumAttributeValue(data.data, 'dosi_somministrate');
            const receivedCount: number = this.sumAttributeValue(data.data, 'dosi_consegnate');
            return {
                doneCount,
                completionPercentage: doneCount / receivedCount,
                receivedCount,
                details: data.data.map(district => {
                    return {
                        districtName: Districts.MAPPING[district.area],
                        doneCount: district.dosi_somministrate,
                        receivedCount: district.dosi_consegnate,
                        completionPercentage: district.percentuale_somministrazione
                    } as VaccinationDistrictStatus;
                })
            } as VaccinationDistrictOverallStatus;
        });
    }

    public getAgeGroups(): Observable<VaccinationAgeGroup[]> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, 'registrySummary', data => {
            return data.data;
        })
        .pipe(
            map((data: RegistrySummary[]) => data.map(summary => ({
                    range: summary.fascia_anagrafica,
                    doneCount: summary.totale
                }))
            )
        );
    }

    public getCategoryGroups(): Observable<VaccinationCategoryGroup[]> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, 'registrySummary', data => {
            return data.data;
        })
        .pipe(
            map((data: RegistrySummary[]) => ([{
                    name: 'Operatori Sanitari e Sociosanitari',
                    doneCount: this.sumAttributeValue(data, 'categoria_operatori_sanitari_sociosanitari')
                }, {
                    name: 'Personale non sanitario',
                    doneCount: this.sumAttributeValue(data, 'categoria_personale_non_sanitario')
                }, {
                    name: 'Ospiti Strutture Residenziali',
                    doneCount: this.sumAttributeValue(data, 'categoria_ospiti_rsa')
                }])
            )
        );
    }

    private getRemoteOrCached(path: string, cacheKey, transformer: (data) => any): Observable<any> {
        if (this.cache[cacheKey] == null) {
            this.cache[cacheKey] = this.http.get<any>(this.url + path)
            .pipe(
                map(transformer),
                publishReplay(1),
                refCount()
            );
        }
        return this.cache[cacheKey];
    }

    private sumAttributeValue(data: RegistrySummary[], attribute: string) {
        return data.reduce((acc, s) => acc + s[attribute], 0);
    }
}

class RegistrySummary {

    'categoria_operatori_sanitari_sociosanitari': number;

    'categoria_ospiti_rsa': number;

    'categoria_over80': number;

    'categoria_personale_non_sanitario': number;

    'fascia_anagrafica': string;

    index: number;

    'prima_dose': number;

    'seconda_dose': number;

    'sesso_femminile': number;

    'sesso_maschile': number;

    totale: number;

    'ultimo_aggiornamento': string;
}
