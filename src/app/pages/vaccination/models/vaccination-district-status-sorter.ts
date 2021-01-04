import { VaccinationDistrictStatus } from './vaccination-district-status';

export class VaccinationDistrictStatusSorter {

    icon: string;

    label: string;

    isSvg: boolean;

    sort: (v1: VaccinationDistrictStatus, v2: VaccinationDistrictStatus) => number;
}
