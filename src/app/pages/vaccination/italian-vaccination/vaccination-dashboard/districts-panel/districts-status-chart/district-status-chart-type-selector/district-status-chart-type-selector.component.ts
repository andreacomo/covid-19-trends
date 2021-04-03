import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Category, GoogeAnalyticsService } from 'src/app/commons/services/googe-analytics.service';
import { DistrictsStatusChartType } from '../districts-status-chart.service';

@Component({
  selector: 'app-district-status-chart-type-selector',
  templateUrl: './district-status-chart-type-selector.component.html',
  styleUrls: ['./district-status-chart-type-selector.component.scss']
})
export class DistrictStatusChartTypeSelectorComponent implements OnInit, OnChanges {

  @Input()
  selected: DistrictsStatusChartType;

  @Output()
  selectChartType: EventEmitter<DistrictsStatusChartType> = new EventEmitter<DistrictsStatusChartType>();

  availableTypes = DistrictsStatusChartType;

  chartTypeLabels: Map<DistrictsStatusChartType, string> = new Map<DistrictsStatusChartType, string>();

  selectedLabel: string;

  constructor(private googleAnalyticsService: GoogeAnalyticsService) {
    this.chartTypeLabels.set(DistrictsStatusChartType.PERCENTAGE_ON_DELIVERED, '% dosi somministrate su consegnate');
    this.chartTypeLabels.set(DistrictsStatusChartType.PERCENTAGE_ON_POPULATION, '% totale dosi su popolazione');
    this.chartTypeLabels.set(DistrictsStatusChartType.ABSOLUTE, 'Dosi somministrate e consegnate');
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      this.selectedLabel = this.chartTypeLabels.get(changes.selected.currentValue);
    }
  }

  select(chartType: DistrictsStatusChartType): void {
    this.selectChartType.next(chartType);

    this.googleAnalyticsService.emitEvent(
      'district_status_switch_chart_type_' + chartType.toString(),
      this.chartTypeLabels.get(chartType),
      Category.CHART_TYPE_SWITCH
    );
  }
}
