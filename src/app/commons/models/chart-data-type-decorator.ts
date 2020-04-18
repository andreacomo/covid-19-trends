import { ChartDataType } from './chart-data-type';

export abstract class ChartDataTypeDecorator {

  constructor() { }

  decorate(chartDataType: ChartDataType): ChartDataType {
    return {
        ...chartDataType,
        transformer: (values) => this.adapt(chartDataType.transformer(values), values)
    };
  }

  protected abstract adapt(transformedValues: number[], originalValues: any[]): any;
}
