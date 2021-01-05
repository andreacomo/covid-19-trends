import { Injectable } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Colors } from 'src/app/commons/models/colors';
import { VaccinationDistrictStatus } from '../../models/vaccination-district-status';

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

    constructor(protected data: VaccinationDistrictStatus[]) {}

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

    protected getSorter(): (v1: VaccinationDistrictStatus, v2: VaccinationDistrictStatus) => number {
        return (v1: VaccinationDistrictStatus, v2: VaccinationDistrictStatus) => v2.completionPercentage - v1.completionPercentage;
    }

    public createChartData(): ChartDataSets[] {
        return [{
            data: this.data.sort(this.getSorter()).map(d => d.completionPercentage * 100),
            backgroundColor: Colors.SUPPORTED.map(c => c + '99'),
            borderColor: Colors.SUPPORTED,
            hoverBackgroundColor: Colors.SUPPORTED.map(c => c + 'AA'),
            hoverBorderColor: Colors.SUPPORTED
        }];
    }

    public createOptions(): ChartOptions {
        const options = super.createOptions();
        options.scales = {
            xAxes: [{
                ticks: {
                    min: 0,
                    max: 100
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

        return options;
    }
}

export class DistrictsStatusChartTypeAbsoluteStrategy extends DistrictsStatusChartTypeStrategy {

    protected getSorter(): (v1: VaccinationDistrictStatus, v2: VaccinationDistrictStatus) => number {
        return (v1: VaccinationDistrictStatus, v2: VaccinationDistrictStatus) => v2.receivedCount - v1.receivedCount;
    }

    public createChartData(): ChartDataSets[] {
        const sortedData = this.data.sort(this.getSorter());
        return [{
            data: sortedData.map(d => d.doneCount),
            backgroundColor: Colors.SUPPORTED,
            borderColor: Colors.SUPPORTED,
            hoverBackgroundColor: Colors.SUPPORTED,
            hoverBorderColor: Colors.SUPPORTED
        }, {
            data: sortedData.map(d => d.receivedCount),
            backgroundColor: Colors.SUPPORTED.map(c => c + '66'),
            borderColor: Colors.SUPPORTED,
            hoverBackgroundColor: Colors.SUPPORTED.map(c => c + 'AA'),
            hoverBorderColor: Colors.SUPPORTED
        }];
    }

    public createOptions(): ChartOptions {
        const options = super.createOptions();
        options.tooltips.callbacks = {
            label: (item: ChartTooltipItem, data: ChartData) => {
                const prefix = item.datasetIndex === 1 ? 'Dosi consegnate' : 'Somministrazioni';
                return `${prefix}: ${item.value}`;
            }
        };

        return options;
    }
}
