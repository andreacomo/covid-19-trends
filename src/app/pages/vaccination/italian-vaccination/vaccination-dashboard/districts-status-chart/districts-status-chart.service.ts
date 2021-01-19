import { Injectable } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Colors } from 'src/app/commons/models/colors';
import { VaccinationDistrictStatus } from '../../models/vaccination-district-status';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Injectable({
    providedIn: 'root'
})
export class DistrictsStatusChartService {

    getStrategy(type: DistrictsStatusChartType, data: VaccinationDistrictStatus[]): DistrictsStatusChartTypeStrategy {
        switch (type) {
            case DistrictsStatusChartType.PERCENTAGE:
                return new DistrictsStatusChartTypePercentageStrategy(data);
            case DistrictsStatusChartType.ABSOLUTE:
                return new DistrictsStatusChartTypeAbsoluteStrategy(data);
            default:
                throw new Error('This should not happen');
        }
    }
}

export enum DistrictsStatusChartType {

    PERCENTAGE, ABSOLUTE
}

export abstract class DistrictsStatusChartTypeStrategy {

    data: (VaccinationDistrictStatus & {color: string})[];

    constructor(data: VaccinationDistrictStatus[]) {
        this.data = data.map((v, i) => {
            return {
                ...v,
                color: Colors.SUPPORTED[i]
            };
        });
    }

    public abstract createPlugins(): any[];

    protected abstract getSorter(): (v1: VaccinationDistrictStatus, v2: VaccinationDistrictStatus) => number;

    public abstract createChartData(): ChartDataSets[];

    public createLabels(): string[] {
        return this.data
                    .sort(this.getSorter())
                    .map(d => d.districtName);
    }

    public createOptions(): ChartOptions {
        return {
            responsive: true,
            aspectRatio: 2,
            legend: {
                display: true,
                position: 'top',
                align: 'center',
                labels: {
                boxWidth: 13,
                fontFamily: 'Roboto, \'Helvetica Neue\', sans-serif'
                }
            },
            tooltips: {
                enabled: true
            }
        };
    }
}

export class DistrictsStatusChartTypePercentageStrategy extends DistrictsStatusChartTypeStrategy {

    public createPlugins(): any[] {
        return [pluginDataLabels];
    }

    protected getSorter(): (v1: VaccinationDistrictStatus, v2: VaccinationDistrictStatus) => number {
        return (v1: VaccinationDistrictStatus, v2: VaccinationDistrictStatus) => v2.completionPercentage - v1.completionPercentage;
    }

    public createChartData(): ChartDataSets[] {
        const sortedData = this.data.sort(this.getSorter());
        const sortedColors = sortedData.map(d => d.color);
        return [{
            data: sortedData.map(d => d.completionPercentage),
            backgroundColor: sortedColors.map(c => c + '99'),
            borderColor: sortedColors,
            hoverBackgroundColor: sortedColors.map(c => c + 'AA'),
            hoverBorderColor: sortedColors
        }];
    }

    public createOptions(): ChartOptions {
        const options = super.createOptions();
        const maxPercentage = this.data.reduce((max, d) => max > d.completionPercentage ? max : d.completionPercentage, 0);
        const ceiledMaxPercentage = Math.ceil(maxPercentage);
        options.scales = {
            xAxes: [{
                ticks: {
                    min: 0,
                    max: maxPercentage < 1 ? 100 : ceiledMaxPercentage + ceiledMaxPercentage * .1
                }
            }]
        };
        options.tooltips.callbacks = {
            label: (item: ChartTooltipItem, data: ChartData) => {
              return parseFloat(item.value).toFixed(2) + '%';
            },
            footer: (items: ChartTooltipItem[], data: ChartData) => {
              const item = items[0];
              const status = this.data[item.index];
              return `Somministrazioni: ${status.doneCount.toLocaleString()}\nDosi consegnate: ${status.receivedCount.toLocaleString()}`;
            }
        };
        options.plugins = {
            datalabels: {
                anchor: 'end',
                align: 'end',
                formatter: (value, ctx) => {
                    return `${parseFloat(value).toFixed(2)}%`;
                }
            },
          };

        return options;
    }
}

export class DistrictsStatusChartTypeAbsoluteStrategy extends DistrictsStatusChartTypeStrategy {

    public createPlugins(): any[] {
        return [];
    }

    protected getSorter(): (v1: VaccinationDistrictStatus, v2: VaccinationDistrictStatus) => number {
        return (v1: VaccinationDistrictStatus, v2: VaccinationDistrictStatus) => v2.doneCount - v1.doneCount;
    }

    public createChartData(): ChartDataSets[] {
        const sortedData = this.data.sort(this.getSorter());
        const sortedColors = sortedData.map(d => d.color);
        return [{
            data: sortedData.map(d => d.doneCount),
            backgroundColor: sortedColors,
            borderColor: sortedColors,
            hoverBackgroundColor: sortedColors,
            hoverBorderColor: sortedColors
        }, {
            data: sortedData.map(d => d.receivedCount),
            backgroundColor: sortedColors.map(c => c + '66'),
            borderColor: sortedColors,
            hoverBackgroundColor: sortedColors.map(c => c + 'AA'),
            hoverBorderColor: sortedColors
        }];
    }

    public createOptions(): ChartOptions {
        const options = super.createOptions();
        options.tooltips.callbacks = {
            label: (item: ChartTooltipItem, data: ChartData) => {
                const prefix = item.datasetIndex === 1 ? 'Dosi consegnate' : 'Somministrazioni';
                return `${prefix}: ${parseInt(item.value, 10).toLocaleString()}`;
            }
        };

        return options;
    }
}
