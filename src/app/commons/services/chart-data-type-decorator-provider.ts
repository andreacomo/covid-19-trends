import { Injectable } from '@angular/core';
import { ChartDataTypeDecorator } from '../models/chart-data-type-decorator';
import { LocalDataService } from './local-data.service';
import { map } from 'rxjs/operators';
import { ProvincePercentAdapter } from '../models/province-percent-adapter';
import { DefaultChartDataTypeValues } from '../models/default-chart-data-type-values.service';
import { Observable } from 'rxjs';
import { IncrementalChartDataTypeAdapter } from '../models/incremental-chart-data-type-adapter';
import { DistrictPercentAdapter } from '../models/district-percent-adapter';

@Injectable({
    providedIn: 'root'
})
export class ChartDataTypeDecoratorProvider {

    private defaultDecorator: ChartDataTypeDecorator = new DefaultChartDataTypeValues(
        'Valori assoluti',
        'timeline',
        false
    );

    private incrementalDecorator: ChartDataTypeDecorator = new IncrementalChartDataTypeAdapter(
        'Andamento incrementale',
        'delta',
        true
    );

    constructor(private localDataService: LocalDataService) { }

    getProvincesDecorators(): Observable<ChartDataTypeDecorator[]> {
        return this.localDataService.getProvincesPopulation()
            .pipe(
                map(pop => {
                    return [
                        new ProvincePercentAdapter(
                            'Rispetto a % popolazione',
                            'percent',
                            true,
                            pop),
                        this.incrementalDecorator,
                        this.defaultDecorator
                    ];
                })
            );
    }

    getDistrictsDecorators(): Observable<ChartDataTypeDecorator[]> {
        return this.localDataService.getDistrictsPopulation()
            .pipe(
                map(pop => {
                    return [
                        new DistrictPercentAdapter(
                            'Rispetto a % popolazione',
                            'percent',
                            true,
                            pop
                        ),
                        this.incrementalDecorator,
                        this.defaultDecorator
                    ];
                })
            );
    }

    getDefaultDecorator(): ChartDataTypeDecorator {
        return this.defaultDecorator;
    }
}
