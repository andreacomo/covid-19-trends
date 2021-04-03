import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CachableRemoteDataService } from './cachable-remote-data.service';
import { ItalianVaccinationCategoriesProvider } from './italian-vaccination-categories-provider';
import { map } from 'rxjs/operators';
import { VaccinationDistrictStatus } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-district-status';
import { VaccinationDistrictOverallStatus } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-district-overall-status';
import { VaccinationAgeGroup } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-age-group';
import { VaccinationCategoryGroup } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-category-group';
import { Districts } from '../models/districts';
import { VaccinationRegistrySummary } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-registry-summary';
import { VaccinationDoses } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-doses';
import { VaccinesDelivery } from 'src/app/pages/vaccination/italian-vaccination/models/vaccines-delivery';
import { VaccinesDeliveryPerSupplierInDistricts, DistrictDelivery } from 'src/app/pages/vaccination/italian-vaccination/models/vaccines-delivery-per-supplier-in-districts';
import { VaccinesDeliveryDatesPerSupplier, SupplierDelivery } from 'src/app/pages/vaccination/italian-vaccination/models/vaccines-delivery-dates-per-supplier';
import { VaccinationPerDay } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-per-day';
import { VaccinationAdministrationSummary } from 'src/app/pages/vaccination/italian-vaccination/models/vaccination-administration-summary';

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
                }, {
                    name: 'Forze Armate',
                    doneCount: this.sumAttributeValue(data, 'categoria_forze_armate')
                }, {
                    name: 'Personale Scolastico',
                    doneCount: this.sumAttributeValue(data, 'categoria_personale_scolastico')
                }])
            )
        );
    }

    public getCategoryGroupsPerDistricts(): Observable<any[]> {
        return this.getRemoteOrCached(this.VACCINES_DONE_SUMMARY, data => {
            return data.data;
        })
        .pipe(
            map((data: VaccinationAdministrationSummary[]) => {
                const sumByDistricts = data.reduce((acc, vax) => {
                    acc[vax.area] = acc[vax.area] || {
                        districtName: Districts.MAPPING[vax.area],
                        area: vax.area,
                        categories: this.categoriesProvider.getCategoriesGroupedByField()
                    };

                    Object.keys(acc[vax.area].categories).forEach(categoryField => {
                        acc[vax.area].categories[categoryField].doneCount =
                            (acc[vax.area].categories[categoryField].doneCount || 0) + vax[categoryField];
                    });

                    return acc;
                }, {});


                return Object.values(sumByDistricts)
                    .map((d: any) => {
                        return {
                            ...d,
                            categories: Object.values(d.categories)
                        };
                    });
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
                    acc[delivery.fornitore] = acc[delivery.fornitore] || [];
                    acc[delivery.fornitore].push(delivery);
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
                        supplier: deliveriesBySupplier[0].fornitore,
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
                    acc[delivery.fornitore] = acc[delivery.fornitore] || [];
                    acc[delivery.fornitore].push(delivery);
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
                        supplier: deliveriesBySupplier[0].fornitore,
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
                    acc[v.data_somministrazione] = acc[v.data_somministrazione] || {
                        day: v.data_somministrazione,
                        doses: {
                            total: 0,
                            first: 0,
                            second: 0
                        }
                    };
                    acc[v.data_somministrazione].doses.total += v.totale;
                    acc[v.data_somministrazione].doses.first += v.prima_dose;
                    acc[v.data_somministrazione].doses.second += v.seconda_dose;

                    return acc;
                }, {});

                return Object.values(vaccinationsGroupedByDay)
                    .sort((v1, v2) => v1.day.localeCompare(v2.day));
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
