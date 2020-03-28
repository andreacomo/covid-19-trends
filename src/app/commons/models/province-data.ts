import { HasColor } from './has-color';

export class ProvinceData extends HasColor {
    data: string;
    stato: string;
    'codice_regione': number;
    'denominazione_regione': string;
    'codice_provincia': number;
    'denominazione_provincia': string;
    'sigla_provincia': string;
    lat: number;
    long: number;
    'totale_casi': number;
}
