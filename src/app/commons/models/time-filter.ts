import { DataFilter } from './data-filter';

export interface TimeFilter extends DataFilter {

  label: string;

  icon: string;

  scope: '3d' | '7d' | '14d' | '30d' | '60d' | '120d' | 'all';

}
