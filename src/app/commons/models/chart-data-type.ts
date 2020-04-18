import { ChartTooltipItem, ChartData } from 'chart.js';

export class ChartDataType {
  label: string;
  value: string;
  active: boolean;
  transformer: (values: any[]) => number[];
  lineDash: number[];
  tooltipFooter: (items: ChartTooltipItem[], data: ChartData) => string;
}

ChartDataType.prototype.tooltipFooter = (items: ChartTooltipItem[], data: ChartData) => {
  const i = items[0];
  const previous = data.datasets[i.datasetIndex].data[i.index - 1] as number;
  const current = parseInt(i.value, 10);
  const incrementPercent = (((current - previous) / previous) * 100);
  const sing = incrementPercent > 0 ? '+' : '';
  if (!isNaN(incrementPercent) && isFinite(incrementPercent)) {
    return `${sing}${incrementPercent.toFixed(2)}% rispetto al giorno precedente`;
  } else {
    return '';
  }
};
