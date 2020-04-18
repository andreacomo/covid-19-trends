import { Population } from './population';
import { ChartDataType } from './chart-data-type';
import { ChartDataTypeDecorator } from './chart-data-type-decorator';
import { ChartTooltipItem, ChartData } from 'chart.js';

export class ProvincePercentAdapter extends ChartDataTypeDecorator {

    constructor(private provincesPop: Population[]) {
        super();
    }

    protected adapt(transformedValues: number[], originalValues: any[]): any {
        const provinceCode = originalValues[0].sigla_provincia;
        const provincePop = this.provincesPop.filter(pop => pop.sigla_provincia === provinceCode)
                            .map(pop => pop.popolazione)[0];
        return transformedValues.map(v => (v / provincePop) * 100);
    }

    protected adaptTooltipFooter(items: ChartTooltipItem[], data: ChartData, chartDataType: ChartDataType): string {
        return '';
    }
}
