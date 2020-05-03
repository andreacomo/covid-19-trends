import { ChartDataTypeDecorator } from './chart-data-type-decorator';

export class IncrementalChartDataTypeAdapter extends ChartDataTypeDecorator {

    protected adapt(transformedValues: number[], originalValues: any[]): number[] {
        return transformedValues
            .map((v, i, list) => i === 0 ? 0 : v - list[i - 1]);
    }

}
