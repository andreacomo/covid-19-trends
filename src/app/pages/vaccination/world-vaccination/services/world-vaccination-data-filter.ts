import { Europe } from 'src/app/commons/models/eurore';
import { CountryVaccinationStatus } from '../models/country-vaccination-status';
import { WorldVaccinationStatus } from '../models/world-vaccination-status';

export abstract class WorldVaccinationDataFilter {

    public filter(data: WorldVaccinationStatus[]): CountryVaccinationStatus[] {
        return data
            .filter(country => this.filterData(country))
            .map(country => country.data.reduce((prev, curr) => this.reduce(prev, curr)))
            .sort((c1, c2) => this.sort(c1, c2))
            .slice(0, this.maxElements());
    }

    protected abstract filterData(country: WorldVaccinationStatus): boolean;

    protected abstract reduce(prev: CountryVaccinationStatus, current: CountryVaccinationStatus): CountryVaccinationStatus;

    protected abstract sort(c1: CountryVaccinationStatus, c2: CountryVaccinationStatus): number;

    protected abstract maxElements(): number;
}

export class FieldBasedWorldVaccinationDataFilter extends WorldVaccinationDataFilter {

    constructor(protected fieldName: string, protected maxCount: number) {
        super();
    }

    protected filterData(country: WorldVaccinationStatus): boolean {
        return true;
    }

    protected reduce(prev: CountryVaccinationStatus, current: CountryVaccinationStatus): CountryVaccinationStatus {
        return prev[this.fieldName] > current[this.fieldName] ? prev : current;
    }

    protected sort(c1: CountryVaccinationStatus, c2: CountryVaccinationStatus): number {
        return c2[this.fieldName] - c1[this.fieldName];
    }

    protected maxElements(): number {
        return this.maxCount;
    }
}

export class EuropeanVaccinationDataFilter extends FieldBasedWorldVaccinationDataFilter {

    protected filterData(country: WorldVaccinationStatus): boolean {
        return Europe.COUNTRIES.indexOf(country.countryName) !== -1;
    }
}
