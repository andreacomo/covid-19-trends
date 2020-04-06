import { DataFilter } from './data-filter';

export interface TimeFilter extends DataFilter {

  scope: '3d' | '7d' | '14d' | '30d' | 'all';

}
