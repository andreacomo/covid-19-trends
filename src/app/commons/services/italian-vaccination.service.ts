import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CachableRemoteDataService } from './cachable-remote-data.service';
import { map } from 'rxjs/operators';
import { VaccinationDistrictStatus } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-district-status';
import { VaccinationDistrictOverallStatus } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-district-overall-status';
import { VaccinationAgeGroup } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-age-group';
import { VaccinationCategoryGroup } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-category-group';
import { Districts } from '../models/districts';
import { VaccinationRegistrySummary } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-registry-summary';
import { VaccinationDoses } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-doses';

@Injectable({
    providedIn: 'root'
  })
export class ItalianVaccinationService {

    private readonly url = 'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/';

    private readonly LATEST_UPDATE = 'last-update-dataset.json';

    private readonly REGISTRY_SUMMARY = 'anagrafica-vaccini-summary-latest.json';

    private readonly VAX_SUMMARY = 'vaccini-summary-latest.json';

    constructor(private remoteService: CachableRemoteDataService) { }

    public getLastUpdate(): Observable<Date> {
        return this.getRemoteOrCached(this.LATEST_UPDATE, data => {
            return Date.parse(data.ultimo_aggiornamento);
        });
    }

    public getTotal(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => this.sumAttributeValue(data, 'totale'))
        );
    }

    public getFirstDosesTotal(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => this.sumAttributeValue(data, 'prima_dose'))
        );
    }

    public getSecondDosesTotal(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => this.sumAttributeValue(data, 'seconda_dose'))
        );
    }

    public getVaccinationDoses(): Observable<VaccinationDoses> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => ({
                total: this.sumAttributeValue(data, 'total'),
                first: this.sumAttributeValue(data, 'prima_dose'),
                second: this.sumAttributeValue(data, 'seconda_dose')
            }))
        );
    }

    public getTotalMen(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => this.sumAttributeValue(data, 'sesso_maschile'))
        );
    }

    public getTotalWomen(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => this.sumAttributeValue(data, 'sesso_femminile'))
        );
    }

    public getVaccinationDistrictsStatus(): Observable<VaccinationDistrictOverallStatus> {
        return this.getRemoteOrCached(this.VAX_SUMMARY, data => {
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
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => data.map(summary => ({
                    range: summary.fascia_anagrafica,
                    doneCount: summary.totale
                }))
            )
        );
    }

    public getCategoryGroups(): Observable<VaccinationCategoryGroup[]> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => ([{
                    name: 'Operatori Sanitari e Sociosanitari',
                    doneCount: this.sumAttributeValue(data, 'categoria_operatori_sanitari_sociosanitari')
                }, {
                    name: 'Personale non sanitario',
                    doneCount: this.sumAttributeValue(data, 'categoria_personale_non_sanitario')
                }, {
                    name: 'Ospiti Strutture Residenziali',
                    doneCount: this.sumAttributeValue(data, 'categoria_ospiti_rsa')
                }, {
                    name: 'Over 80',
                    doneCount: this.sumAttributeValue(data, 'categoria_over80')
                }])
            )
        );
    }

    private getRemoteOrCached(path: string, transformer: (data) => any): Observable<any> {
        return this.remoteService.getData<any>(this.url + path)
            .pipe(
                map(transformer)
            );
    }

    private sumAttributeValue(data: VaccinationRegistrySummary[], attribute: string) {
        return data.reduce((acc, s) => acc + s[attribute], 0);
    }
}
