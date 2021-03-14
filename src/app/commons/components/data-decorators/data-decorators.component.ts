import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProvincePercentAdapter } from '../../models/province-percent-adapter';
import { ChartDataTypeDecorator } from '../../models/chart-data-type-decorator';
import { DefaultChartDataTypeValues } from '../../models/default-chart-data-type-values.service';

@Component({
  selector: 'app-data-decorators',
  templateUrl: './data-decorators.component.html',
  styleUrls: ['./data-decorators.component.scss']
})
export class DataDecoratorsComponent implements OnInit {

  @Input()
  selectedDecorator: ChartDataTypeDecorator;

  @Output()
  selectDecorator: EventEmitter<ChartDataTypeDecorator> = new EventEmitter<ChartDataTypeDecorator>();

  @Input()
  decorators: ChartDataTypeDecorator[];

  constructor() { }

  ngOnInit() {
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
