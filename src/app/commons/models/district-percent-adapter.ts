import { ProvincePopulation } from './province-population';
import { ChartDataType } from './chart-data-type';
import { ChartDataTypeDecorator } from './chart-data-type-decorator';
import { ChartTooltipItem, ChartData } from 'chart.js';
import { DistrictPopulation } from './district-population';

export class DistrictPercentAdapter extends ChartDataTypeDecorator {

    constructor(label: string, icon: string, isSvg: boolean, private districtsPop: DistrictPopulation[]) {
        super(label, icon, isSvg);
    }

    protected adapt(transformedValues: number[], originalValues: any[]): any {
        const districtName = originalValues[0].denominazione_regione;
        const districtPop = this.districtsPop.filter(pop => pop.regione === districtName)
                            .map(pop => pop.popolazione)[0];
        return transformedValues.map(v => (v / districtPop) * 100);
    }

    protected adaptTooltipFooter(items: ChartTooltipItem[], data: ChartData, chartDataType: ChartDataType): string {
        return `${parseFloat(items[0].value).toFixed(2)}%`;
    }
}
