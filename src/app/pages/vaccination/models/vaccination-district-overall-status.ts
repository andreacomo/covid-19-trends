import { VaccinationDistrictStatus } from './vaccination-district-status';

export class VaccinationDistrictOverallStatus {

    doneCount: number;

    receivedCount: number;

    completionPercentage: number;

    details: VaccinationDistrictStatus[];
}
