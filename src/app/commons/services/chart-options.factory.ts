import { ChartOptions } from 'chart.js';

export default class ChartOptionsFactory {

    public static createDefault(): ChartOptions {
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
