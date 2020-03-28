import { ChartDataSets, ChartOptions, ChartSize, ChartTooltipItem, ChartData } from 'chart.js';
import { Colors } from 'src/app/commons/models/colors';
import { Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Milestone } from 'src/app/commons/models/milestone';
import { GroupData } from '../models/group-data';
import { ProvinceData } from '../models/province-data';
import { DistrictData } from '../models/district-data';
import { ChartDataType } from '../components/line-chart/line-chart.component';
import { HasColor } from '../models/has-color';

export class LinearChartProvider {

    static getOptions(milestones: Milestone[]): (ChartOptions & { annotation: any }) {
        let labelGaps = 1;
        return {
            responsive: true,
            aspectRatio: 2,
            legend: {
              display: false,
              position: 'top',
              align: 'center',
              labels: {
                boxWidth: 13,
                fontFamily: 'Roboto, \'Helvetica Neue\', sans-serif'
              }
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
                  const previous = data.datasets[i.datasetIndex].data[i.index - 1] as number;
                  const current = parseInt(i.value, 10);
                  const incrementPercent = (((current - previous) / previous) * 100);
                  const sing = incrementPercent > 0 ? '+' : '';
                  if (!isNaN(incrementPercent) && isFinite(incrementPercent)) {
                    return `${sing}${incrementPercent.toFixed(2)}% rispetto al giorno precedente`;
                  } else {
                    return '';
                  }
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

    static createChartData<T extends HasColor>(data: {[code: string]: T[]},
                                               dataType: ChartDataType): ChartDataSets[] {
        return Object.entries(data)
            .filter(([code]) => code)
            .map(([code, values]) => {
              return {
                label: `${code} - ${dataType.label}`,
                data: dataType.transformer(values),
                fill: false,
                pointRadius: 5,
                backgroundColor: values[0].color,
                borderColor: values[0].color,
                pointBackgroundColor: values[0].color,
                borderDash: dataType.lineDash,
                borderWidth: 3,
                pointBorderWidth: 1
              };
            });
    }

    static createLabels<T extends { data: string }>(data: {[code: string]: T[]}): Label[] {
        return (Object.entries(data)[0][1])
                            .map(v => this.dateStringAsLabel(v.data));
    }

    static createUpdatedOn<T extends { data: string }>(data: {[code: string]: T[]}): Date {
      const firstData = Object.entries(data)[0][1];
      return new Date(firstData[firstData.length - 1].data);
    }

    static getPlugins(): any[] {
        return [pluginAnnotations];
    }

    private static dateStringAsLabel(date: string): string {
        const datePart = date.split('T')[0];
        const split = datePart.split('-');
        return `${split[2]}/${split[1]}`;
    }
}
