import { ProvinceData } from './province-data';
import { DistrictData } from './district-data';

export class GroupData<T> {

    groupBy: string;

    data: T[];
}
