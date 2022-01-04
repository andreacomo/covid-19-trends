import { ChartDataSets, ChartOptions, ChartTooltipItem, ChartData } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Milestone } from 'src/app/commons/models/milestone';
import { HasColor } from '../models/has-color';
import { Injectable } from '@angular/core';
import { DateStringPipe } from '../pipes/date-string.pipe';
import { DataFilter } from '../models/data-filter';
import { ChartDataType } from '../models/chart-data-type';
import ChartOptionsFactory from './chart-options.factory';

@Injectable({
  providedIn: 'root'
})
export class LinearChartProvider {

    private static readonly THIN_LINE_WIDTH: number = 2;

    private static readonly THIN_POINT_RADIUS: number = 3;

    constructor(private dateString: DateStringPipe) { }

    public getOptions(milestones: Milestone[]): (ChartOptions & { annotation: any }) {
        let labelGaps = 1;
        return {
            ...ChartOptionsFactory.createDefault(),
            legend: {
              display: false
            },
            tooltips: {
              enabled: true,
              callbacks: {
                beforeTitle: (items: ChartTooltipItem[], data: ChartData) => {
                    const first = items[0];
                    return data.datasets[first.datasetIndex].label.split('::')[0];
                },
                label: (item: ChartTooltipItem, data: ChartData) => {
                  return item.value;
                },
                footer: (items: ChartTooltipItem[], data: ChartData) => {
                  const i = items[0];
                  return (data.datasets[i.datasetIndex] as any).tooltipFooter(items, data);
                }
              }
            },
            layout: {
              padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
              }
            },
            annotation: {
                annotations: milestones.map(m => {
                    return {
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x-axis-0',
                        value: this.dateStringAsLabel(m.date),
                        borderColor: 'orange',
                        borderWidth: 1,
                        label: {
                            enabled: true,
                            position: 'top',
                            yAdjust: (150 / labelGaps++),
                            fontColor: '#555',
                            backgroundColor: '#dddd',
                            rotation: 120,
                            content: m.description
                        }
                    };
                })
            }
          };
    }

    public createChartData<T extends HasColor>(data: {[code: string]: T[]},
                                               dataType: ChartDataType,
                                               override: ChartDataSets = {},
                                               filters: DataFilter[] = [{apply: values => values}]): ChartDataSets[] {

        const lineWidth = LinearChartProvider.THIN_LINE_WIDTH;
        const dotRadius = LinearChartProvider.THIN_POINT_RADIUS;

        return Object.entries(data)
            .filter(([code]) => code)
            .map(([code, values]) => {
              const color = values[0].color;
              return {
                label: `${code} - ${dataType.label}`,
                data: dataType.transformer(filters.reduce((acc, f) => f.apply(values), [])),
                fill: false,
                backgroundColor: color,
                borderColor: color,
                pointBackgroundColor: color,
                pointHoverBorderColor: color,
                borderDash: dataType.lineDash,
                borderWidth: lineWidth,
                pointRadius: dotRadius,
                pointBorderWidth: 1,
                lineTension: 0,
                tooltipFooter: dataType.tooltipFooter,
                ...override
              };
            });
    }

    public createLabels<T extends { data: string }>(data: {[code: string]: T[]},
                                                    filters: DataFilter[] = [{apply: values => values}]): Label[] {
      const firstData = (Object.entries(data)[0][1]);
      return filters.reduce((acc, f) => f.apply(firstData), [])
                    .map(v => this.dateStringAsLabel(v.data));
    }

    public createUpdatedOn<T extends { data: string }>(data: {[code: string]: T[]}): Date {
      const firstData = Object.entries(data)[0][1];
      return new Date(firstData[firstData.length - 1].data);
    }

    public getPlugins(): any[] {
        return [pluginAnnotations];
    }

    private dateStringAsLabel(date: string): string {
        return this.dateString.transform(date);
    }
}
