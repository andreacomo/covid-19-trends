import { ChartDataTypeDecorator } from './chart-data-type-decorator';

export class DefaultChartDataTypeValues extends ChartDataTypeDecorator {

  protected adapt(transformedValues: number[], originalValues: any[]): number[] {
    return transformedValues;
  }
}
