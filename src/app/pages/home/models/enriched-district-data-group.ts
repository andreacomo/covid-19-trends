import { DistrictData } from 'src/app/commons/models/district-data';
import { EnrichedDistrict } from './enriched-district';

export interface EnrichedDistrictDataGroup {
    [district: string]: (DistrictData & EnrichedDistrict)[];
}
