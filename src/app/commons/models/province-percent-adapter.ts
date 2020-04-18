import { Population } from './population';
import { ChartDataType } from './chart-data-type';

export class ProvincePercentAdapter {

    constructor(private provincesPop: Population[]) { }

    decorate(chartDataType: ChartDataType): ChartDataType {
        return {
            ...chartDataType,
            transformer: (values) => this.adapt(chartDataType.transformer(values), values)
        };
    }

    private adapt(transformedValues: number[], originalValues: any[]): any {
        const provinceCode = originalValues[0].sigla_provincia;
        const provincePop = this.provincesPop.filter(pop => pop.sigla_provincia === provinceCode)
                            .map(pop => pop.popolazione)[0];
        return transformedValues.map(v => (v / provincePop) * 100);
    }
}
