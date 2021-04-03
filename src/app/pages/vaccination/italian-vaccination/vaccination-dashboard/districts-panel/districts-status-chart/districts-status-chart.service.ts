import { Injectable } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Colors } from 'src/app/commons/models/colors';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Numbers } from 'src/app/commons/models/numbers';
import { VaccinationDistrictStatus } from '../../../models/vaccination-district-status';
import { LocalDataService } from 'src/app/commons/services/local-data.service';
import { DistrictPopulation } from 'src/app/commons/models/district-population';

@Injectable({
    providedIn: 'root'
})
export class DistrictsStatusChartService {

    getStrategy(type: DistrictsStatusChartType,
                vaccination: VaccinationDistrictStatus[],
                population: DistrictPopulation[]): DistrictsStatusChartTypeStrategy {

        switch (type) {
            case DistrictsStatusChartType.PERCENTAGE_ON_DELIVERED:
                return new DistrictsStatusChartTypeDeliveryPercentageStrategy(vaccination);
            case DistrictsStatusChartType.PERCENTAGE_ON_POPULATION:
                return new DistrictsStatusChartTypePopulationDeliveryPercentageStrategy(vaccination, population);
            case DistrictsStatusChartType.ABSOLUTE:
                return new DistrictsStatusChartTypeAbsoluteStrategy(vaccination);
            default:
                throw new Error('This should not happen');
        }
    }
}

export enum DistrictsStatusChartType {

    PERCENTAGE_ON_DELIVERED, PERCENTAGE_ON_POPULATION, ABSOLUTE
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

    protected abstract getSorter(): (v1: any, v2: any) => number;

    public abstract createChartData(): ChartDataSets[];

    public createLabels(): string[] {
        return this.data
                    .sort(this.getSorter())
                    .map((d, index) => `${index + 1} - ${d.districtName}`);
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

abstract class DistrictsStatusChartTypePercentageStrategy extends DistrictsStatusChartTypeStrategy {

    public createPlugins(): any[] {
        return [pluginDataLabels];
    }

    protected configureOptions(mainData: any[], options: ChartOptions): ChartOptions {
        const maxPercentage = mainData.reduce((max, d) => max > d.completionPercentage ? max : d.completionPercentage, 0);
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
                return Numbers.appendPercentWithPrecisionFromString(item.value, 2);
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

export class DistrictsStatusChartTypeDeliveryPercentageStrategy extends DistrictsStatusChartTypePercentageStrategy {

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
        super.configureOptions(this.data, options);

        options.tooltips.callbacks.footer = (items: ChartTooltipItem[], data: ChartData) => {
            const item = items[0];
            const status = this.data[item.index];
            return `Somministrazioni: ${status.doneCount.toLocaleString()}\nDosi consegnate: ${status.receivedCount.toLocaleString()}`;
        };

        return options;
    }
}

export class DistrictsStatusChartTypePopulationDeliveryPercentageStrategy extends DistrictsStatusChartTypePercentageStrategy {

    private mergedData: {districtName: string, doneCount: number, population: number, completionPercentage: number, color: string}[];

    constructor(data: VaccinationDistrictStatus[], population: DistrictPopulation[]) {
        super(data);
        const populationPerDistrict: {[district: string]: DistrictPopulation} = population.reduce((acc, p) => {
            acc[p.regione] = p;
            return acc;
        }, {});

        this.mergedData = this.data.map(d => {
            return {
                districtName: d.districtName,
                doneCount: d.doneCount,
                population: populationPerDistrict[d.districtName].popolazione,
                completionPercentage: (d.doneCount / populationPerDistrict[d.districtName].popolazione) * 100,
                color: d.color
            };
        })
        .sort(this.getSorter());
    }

    public createLabels(): string[] {
        return this.mergedData
                    .sort(this.getSorter())
                    .map((d, index) => `${index + 1} - ${d.districtName}`);
    }

    protected getSorter(): (v1: {completionPercentage: number}, v2: {completionPercentage: number}) => number {
        // tslint:disable-next-line:max-line-length
        return (v1: {completionPercentage: number}, v2: {completionPercentage: number}) => v2.completionPercentage - v1.completionPercentage;
    }

    public createChartData(): ChartDataSets[] {
        const sortedColors = this.mergedData.map(d => d.color);
        return [{
            data: this.mergedData.map(d => d.completionPercentage),
            backgroundColor: sortedColors.map(c => c + '99'),
            borderColor: sortedColors,
            hoverBackgroundColor: sortedColors.map(c => c + 'AA'),
            hoverBorderColor: sortedColors
        }];
    }

    public createOptions(): ChartOptions {
        const options = super.createOptions();
        super.configureOptions(this.mergedData, options);

        options.tooltips.callbacks.footer = (items: ChartTooltipItem[], data: ChartData) => {
            const item = items[0];
            const status = this.mergedData[item.index];
            return `Somministrazioni: ${status.doneCount.toLocaleString()}\nPopolazione: ${status.population.toLocaleString()}`;
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
                return `${prefix}: ${Numbers.beautifyWithSeparators(item.value)}`;
            }
        };

        return options;
    }
}
