export interface ChartDataType {
  label: string;
  value: string;
  active: boolean;
  transformer: (values: any[]) => number[];
  lineDash: number[];
}
