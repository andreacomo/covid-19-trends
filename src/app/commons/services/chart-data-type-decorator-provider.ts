import { Injectable } from '@angular/core';
import { ChartDataTypeDecorator } from '../models/chart-data-type-decorator';
import { LocalDataService } from './local-data.service';
import { map } from 'rxjs/operators';
import { ProvincePercentAdapter } from '../models/province-percent-adapter';
import { DefaultChartDataTypeValues } from '../models/default-chart-data-type-values.service';
import { Observable } from 'rxjs';
import { IncrementalChartDataTypeAdapter } from '../models/incremental-chart-data-type-adapter';

@Injectable({
    providedIn: 'root'
})
export class ChartDataTypeDecoratorProvider {

    private defaultDecorator: ChartDataTypeDecorator = new DefaultChartDataTypeValues(
        'Valori assoluti',
        'timeline',
        false
    );

    constructor(private localDataService: LocalDataService) { }

    getYDecorators(): Observable<ChartDataTypeDecorator[]> {
        return this.localDataService.getProvincesPopulation()
            .pipe(
                map(pop => {
                    return [
                        new ProvincePercentAdapter(
                            'Rispetto a % popolazione',
                            'percent',
                            true,
                            pop),
                        new IncrementalChartDataTypeAdapter(
                            'Andamento incrementale',
                            'delta',
                            true
                        ),
                        this.defaultDecorator
                    ];
                })
            );
    }

    getDefaultDecorator(): ChartDataTypeDecorator {
        return this.defaultDecorator;
    }
}
