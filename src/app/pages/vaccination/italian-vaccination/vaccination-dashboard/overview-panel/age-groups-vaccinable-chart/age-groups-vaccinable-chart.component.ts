import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Label } from 'ng2-charts';
import { Numbers } from 'src/app/commons/models/numbers';
import { VaccinableAgeGroupAudience } from 'src/app/commons/models/vaccinable-age-group-audience';
import ChartOptionsFactory from 'src/app/commons/services/chart-options.factory';
import { VaccinationAgeGroup } from '../../../models/vaccination-age-group';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from 'src/app/commons/models/colors';

@Component({
  selector: 'app-age-groups-vaccinable-chart',
  templateUrl: './age-groups-vaccinable-chart.component.html',
  styleUrls: ['./age-groups-vaccinable-chart.component.scss']
})
export class AgeGroupsVaccinableChartComponent implements OnInit, OnChanges {

  @Input()
  data: VaccinationAgeGroup[];

  @Input()
  population: VaccinableAgeGroupAudience[];

  options: ChartOptions;

  plugins: any[];

  labels: Label[];

  chartData: ChartDataSets[];

  constructor() {
    this.plugins = [pluginDataLabels];
    this.options = {
      ...ChartOptionsFactory.createDefault(),
      scales: {
        xAxes: [{
          stacked: false,
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          stacked: false,
          gridLines: {
            display: true
          },
          ticks: {
            callback: (value, index, values) => {
              return Numbers.appendPercent(value as number);
            }
          }
        }]
      },
      tooltips: {
        enabled: true,
        mode: 'label',
        callbacks: {
          label: (item: ChartTooltipItem, data: ChartData) => {
            return `${data.datasets[item.datasetIndex].label}: ${Numbers.appendPercentWithPrecisionFromString(item.value)}`;
          }
        }
      },
      plugins: {
        datalabels: {
          font: {
            weight: 'bold'
          },
          anchor: 'end',
          align: 'end',
          offset: -2,
          formatter: (value, ctx) => {
            return Numbers.appendPercentWithPrecisionFromString(value);
          }
        },
      }
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data != null && this.population != null) {
      this.labels = this.population.map(p => p.range);

      this.chartData = [{
        data: this.createDataToPlot(d => d.doses.first),
        label: 'Con Una dose',
        backgroundColor: Colors.DOSE_1 + 'BB',
        borderColor: Colors.DOSE_1 + 'BB',
        hoverBackgroundColor: Colors.DOSE_1,
        hoverBorderColor: Colors.DOSE_1,
      }, {
        data: this.createDataToPlot(d => d.doses.second),
        label: 'Con Due dosi',
        backgroundColor: Colors.DOSE_2 + 'BB',
        borderColor: Colors.DOSE_2 + 'BB',
        hoverBackgroundColor: Colors.DOSE_2,
        hoverBorderColor: Colors.DOSE_2,
      }, {
        data: this.createDataToPlot(d => d.doses.third),
        label: 'Con Tre dosi',
        backgroundColor: Colors.DOSE_3 + 'BB',
        borderColor: Colors.DOSE_3 + 'BB',
        hoverBackgroundColor: Colors.DOSE_3,
        hoverBorderColor: Colors.DOSE_3,
      }, {
        data: this.createDataToPlot(d => d.doses.afterHealing),
        label: 'Dosi a guariti',
        backgroundColor: Colors.DOSE_AH + 'BB',
        borderColor: Colors.DOSE_AH + 'BB',
        hoverBackgroundColor: Colors.DOSE_AH,
        hoverBorderColor: Colors.DOSE_AH,
      }];
    }
  }

  private createDataToPlot(extractor: (VaccinationAgeGroup) => number): number[] {
    const vaccinatedByAge = this.data.reduce((group, d) => {
      group[d.range] = extractor(d);
      return group;
    }, {} as { [range: string]: number; });

    return this.population
      .map(pop => ({
        range: pop.range,
        audience: pop.population,
        vaccinated: pop.range === '80+' ? vaccinatedByAge['80-89'] + vaccinatedByAge['90+'] : vaccinatedByAge[pop.range]
      }))
      .map(aud => (aud.vaccinated / aud.audience) * 100);
  }
}

class VaccinableAudiencePerAge {

  range: string;
  audience: number;
  vaccinated: number;
  percentage: number;
}
