import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProvincePercentAdapter } from '../../models/province-percent-adapter';
import { LocalDataService } from '../../services/local-data.service';
import { map } from 'rxjs/operators';
import { ChartDataTypeDecorator } from '../../models/chart-data-type-decorator';
import { ChartDataTypeDecoratorProvider } from '../../services/chart-data-type-decorator-provider';
import { DefaultChartDataTypeValues } from '../../models/default-chart-data-type-values.service';

@Component({
  selector: 'app-percentage-adapter',
  templateUrl: './percentage-adapter.component.html',
  styleUrls: ['./percentage-adapter.component.scss']
})
export class PercentageAdapterComponent implements OnInit {

  @Input()
  selectedDecorator: ChartDataTypeDecorator;

  @Output()
  selectDecorator: EventEmitter<ChartDataTypeDecorator> = new EventEmitter<ChartDataTypeDecorator>();

  decorators: ChartDataTypeDecorator[];

  constructor(private decoratorsProvider: ChartDataTypeDecoratorProvider) { }

  ngOnInit() {
    this.decoratorsProvider.getYDecorators()
      .subscribe(d => this.decorators = d);
  }

  select(decorator: ChartDataTypeDecorator) {
    this.selectDecorator.next(decorator);
  }
}

class DecoratorWrapper {

  decorator: ChartDataTypeDecorator;

  label: string;

  icon: string;

  isSvg: boolean;

  static crateFrom(decorator: ChartDataTypeDecorator): DecoratorWrapper {
    if (decorator instanceof ProvincePercentAdapter) {
      return {
        decorator,
        label: 'Rispetto a % popolazione',
        icon: 'percent',
        isSvg: true
      };
    } else if (decorator instanceof DefaultChartDataTypeValues) {
      return {
        decorator,
        label: 'Valori assoluti',
        icon: 'timeline',
        isSvg: false
      };
    } else {
      throw new Error(`Unknown decorator ${decorator}`);
    }
  }
}
