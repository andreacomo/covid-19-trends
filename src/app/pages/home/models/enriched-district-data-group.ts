import { EnrichedData } from './enriched-data';

export interface EnrichedDataGroup<T> {
    [district: string]: (T & EnrichedData)[];
}
