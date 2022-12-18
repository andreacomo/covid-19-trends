import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CachableRemoteDataService } from './cachable-remote-data.service';
import { ItalianVaccinationCategoriesProvider } from './italian-vaccination-categories-provider';
import { map } from 'rxjs/operators';
import { VaccinationDistrictStatus } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-district-status';
import { VaccinationDistrictOverallStatus } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-district-overall-status';
import { VaccinationAgeGroup } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-age-group';
import { Districts } from '../models/districts';
import { VaccinationRegistrySummary } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-registry-summary';
import { VaccinationDoses } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-doses';
import { VaccinesDelivery } from 'src/app/pages/vaccination/italian-vaccination/models/vaccines-delivery';
import { VaccinesDeliveryPerSupplierInDistricts, DistrictDelivery } from 'src/app/pages/vaccination/italian-vaccination/models/vaccines-delivery-per-supplier-in-districts';
import { VaccinesDeliveryDatesPerSupplier, SupplierDelivery } from 'src/app/pages/vaccination/italian-vaccination/models/vaccines-delivery-dates-per-supplier';
import { VaccinationPerDay } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-per-day';
import { VaccinationAdministrationSummary } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-administration-summary';
import { ItalianVaccinationCategories, ItalianVaccinationCategory } from '../models/italian-vaccination-category';
import { VaccinableAudience } from '../models/vaccinable-audience';
import { VaccinableDistrictAudience } from '../models/vaccinable-district-audience';
import { VaccinableAgeGroupAudience } from '../models/vaccinable-age-group-audience';

@Injectable({
    providedIn: 'root'
  })
export class ItalianVaccinationService {

    private readonly url = 'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/';

    private readonly LATEST_UPDATE = 'last-update-dataset.json';

    private readonly REGISTRY_SUMMARY = 'anagrafica-vaccini-summary-latest.json';

    private readonly VAX_SUMMARY = 'vaccini-summary-latest.json';

    private readonly VACCINES_DELIVERY = 'consegne-vaccini-latest.json';

    private readonly VACCINES_DONE_SUMMARY = 'somministrazioni-vaccini-summary-latest.json';

    private readonly AUDIENCE = 'platea.json';

    constructor(private remoteService: CachableRemoteDataService,
                private categoriesProvider: ItalianVaccinationCategoriesProvider) { }

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

    public getVaccinationDoses(): Observable<VaccinationDoses> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => ({
                total: this.sumAttributeValue(data, 'total'),
                first: this.sumAttributeValue(data, 'd1'),
                second: this.sumAttributeValue(data, 'd2'),
                booster1: this.sumAttributeValue(data, 'db1'),
                afterHealing: this.sumAttributeValue(data, 'dpi')
            }))
        );
    }

    public getTotalMen(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => this.sumAttributeValue(data, 'm'))
        );
    }

    public getTotalWomen(): Observable<number> {
        return this.getRemoteOrCached(this.REGISTRY_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationRegistrySummary[]) => this.sumAttributeValue(data, 'f'))
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
                    range: summary.eta,
                    doses: {
                        total: summary.totale,
                        first: summary.d1,
                        second: summary.d2,
                        booster1: summary.db1,
                        afterHealing: summary.dpi
                    }
                }))
            )
        );
    }

    public getCategoryGroupsPerDistricts(): Observable<ItalianVaccinationCategories> {
        return this.getRemoteOrCached(this.VACCINES_DONE_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationAdministrationSummary[]) => {
                type CategoriesInDistrict = {
                    [districtArea: string]: {
                        districtName: string,
                        area: string,
                        categories: {[categoryField: string]: ItalianVaccinationCategory}
                    }
                };
                const sumCategoriesInDistricts = data.reduce((acc, vax) => {
                    acc[vax.area] = acc[vax.area] || {
                        districtName: Districts.MAPPING[vax.area],
                        area: vax.area,
                        categories: this.categoriesProvider.getCategoriesGroupedByField()
                    };

                    Object.keys(acc[vax.area].categories).forEach(categoryField => {
                        acc[vax.area].categories[categoryField].doneCount =
                            (acc[vax.area].categories[categoryField].doneCount || 0) + vax[categoryField];
                        acc[vax.area].categories[categoryField].districtName = Districts.MAPPING[vax.area];
                    });

                    return acc;
                }, {} as CategoriesInDistrict);

                const groupByCategory = Object.values(sumCategoriesInDistricts)
                    .flatMap(district => Object.values(district.categories))
                    .reduce((acc, category) => {
                        acc[category.name] = acc[category.name] || [];
                        acc[category.name].push(category);
                        return acc;
                    }, {});

                return groupByCategory;
            })
        );
    }

    public getVaccinesDeliveriesInDistricts(): Observable<VaccinesDeliveryPerSupplierInDistricts[]> {
        return this.getRemoteOrCached(this.VACCINES_DELIVERY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinesDelivery[]) => {
                const groupBySupplier = data.reduce((acc, delivery) => {
                    acc[delivery.forn] = acc[delivery.forn] || [];
                    acc[delivery.forn].push(delivery);
                    return acc;
                }, {} as {[supplier: string]: VaccinesDelivery[]});

                return Object.values(groupBySupplier).map((deliveriesBySupplier) => {
                    const groupByDistrict = deliveriesBySupplier.reduce((acc, delivery) => {
                        const reduction = acc[delivery.area] || {
                            districtName: Districts.MAPPING[delivery.area],
                            doses: 0
                        } as DistrictDelivery;

                        acc[delivery.area] = reduction;
                        reduction.doses += delivery.numero_dosi;
                        return acc;
                    }, {} as {[area: string]: DistrictDelivery});

                    return {
                        supplier: deliveriesBySupplier[0].forn,
                        deliveries: Object.values(groupByDistrict)
                    } as VaccinesDeliveryPerSupplierInDistricts;
                });
            })
        );
    }

    public getVaccinesDeliveryInTime(): Observable<VaccinesDeliveryDatesPerSupplier[]> {
        return this.getRemoteOrCached(this.VACCINES_DELIVERY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinesDelivery[]) => {
                const groupBySupplier = data.reduce((acc, delivery) => {
                    acc[delivery.forn] = acc[delivery.forn] || [];
                    acc[delivery.forn].push(delivery);
                    return acc;
                }, {} as {[supplier: string]: VaccinesDelivery[]});

                return Object.values(groupBySupplier).map((deliveriesBySupplier) => {
                    const groupByDate = deliveriesBySupplier.reduce((acc, delivery) => {
                        const reduction = acc[delivery.data_consegna] || {
                            date: delivery.data_consegna,
                            doses: 0
                        } as SupplierDelivery;

                        acc[delivery.data_consegna] = reduction;
                        reduction.doses += delivery.numero_dosi;
                        return acc;
                    }, {} as {[date: string]: SupplierDelivery});

                    return {
                        supplier: deliveriesBySupplier[0].forn,
                        deliveries: Object.values(groupByDate).sort((d1, d2) => d1.date.localeCompare(d2.date))
                    } as VaccinesDeliveryDatesPerSupplier;
                });
            })
        );
    }

    public getVaccinationsPerDay(): Observable<VaccinationPerDay[]> {
        return this.getRemoteOrCached(this.VACCINES_DONE_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationAdministrationSummary[]) => {
                const vaccinationsGroupedByDay: {[day: string]: VaccinationPerDay} = data.reduce((acc, v) => {
                    acc[v.data] = acc[v.data] || {
                        day: v.data,
                        doses: {
                            total: 0,
                            first: 0,
                            second: 0,
                            booster1: 0,
                            afterHealing: 0
                        }
                    };
                    acc[v.data].doses.total += v.totale;
                    acc[v.data].doses.first += v.d1;
                    acc[v.data].doses.second += v.d2;
                    acc[v.data].doses.booster1 += v.db1;
                    acc[v.data].doses.afterHealing += v.dpi;

                    return acc;
                }, {});

                return Object.values(vaccinationsGroupedByDay)
                    .sort((v1, v2) => v1.day.localeCompare(v2.day));
            })
        );
    }

    public getVaccinableDistrictAudience(): Observable<VaccinableDistrictAudience[]> {
        return this.getRemoteOrCached(this.AUDIENCE, data => {
            return data.data;
        })
        .pipe(
            map((audiences: VaccinableAudience[]) => {
                return audiences.reduce((acc, aud) => {
                    acc[aud.area] = acc[aud.area] || [];
                    acc[aud.area].push(aud);
                    return acc;
                }, {});
            }),
            map((group: {[district: string]: VaccinableAudience[]}) => {
                return Object.values(group)
                    .map(audsInDistrict => {
                        const totalPop = audsInDistrict.reduce((acc, aud) => acc += aud.totale_popolazione, 0);
                        return {
                            district: audsInDistrict[0].area,
                            population: totalPop
                        } as VaccinableDistrictAudience;
                    });
            })
        );
    }

    public getVaccinableAgeGroupAudience(): Observable<VaccinableAgeGroupAudience[]> {
        return this.getRemoteOrCached(this.AUDIENCE, data => {
            return data.data;
        })
        .pipe(
            map((audiences: VaccinableAudience[]) => {
                return audiences.reduce((acc, aud) => {
                    acc[aud.eta] = acc[aud.eta] || [];
                    acc[aud.eta].push(aud);
                    return acc;
                }, {});
            }),
            map((group: {[age: string]: VaccinableAudience[]}) => {
                return Object.values(group)
                    .map(audiencePerAge => {
                        const totalPop = audiencePerAge.reduce((acc, aud) => acc += aud.totale_popolazione, 0);
                        return {
                            range: audiencePerAge[0].eta,
                            population: totalPop
                        } as VaccinableAgeGroupAudience;
                    });
            })
        );
    }

    private getRemoteOrCached(path: string, transformer: (data) => any): Observable<any> {
        return this.remoteService.getData<any>(this.url + path)
            .pipe(
                map(transformer)
            );
    }

    private sumAttributeValue(data: any[], attribute: string) {
        return data.reduce((acc, s) => acc + s[attribute], 0);
    }
}
