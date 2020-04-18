import { ChartDataType } from './chart-data-type';
import { ChartTooltipItem, ChartData } from 'chart.js';

export abstract class ChartDataTypeDecorator {

  constructor(private label: string, private icon: string, private isSvg: boolean) { }

  decorate(chartDataType: ChartDataType): ChartDataType {
    return {
        ...chartDataType,
        transformer: (values: any[]) => this.adapt(chartDataType.transformer(values), values),
        tooltipFooter: (items: ChartTooltipItem[], data: ChartData) => this.adaptTooltipFooter(items, data, chartDataType)
    };
  }

  protected abstract adapt(transformedValues: number[], originalValues: any[]): number[];

  /**
   * Keeps original tooltip. Override this method to override tooltip in data chart
   * @param items chart tooltip items
   * @param data chart data
   * @param chartDataType original chart data type
   */
  protected adaptTooltipFooter(items: ChartTooltipItem[], data: ChartData, chartDataType: ChartDataType): string {
    return chartDataType.tooltipFooter(items, data);
  }
}
