import { DataFilter } from './data-filter';
import { Population } from './population';

export class ProvincePercentageFilter implements DataFilter {

    constructor(private provincesPop: Population[], private field: string) {}

    apply(values: any[]): any[] {
        const provinceCode = values[0].sigla_provincia;
        const provincePop = this.provincesPop.filter(pop => pop.sigla_provincia === provinceCode)
                            .map(pop => pop.popolazione)[0];
        return values.map(v => v[this.field] / provincePop);
    }
}
